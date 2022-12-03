// https://github.com/glumb/kinematics

class Kinematics {
  /**
   * @param {Array} geometry [5][3] Array including geometry information [x,y,z]
   */
  constructor(geometry) {
    if (geometry.length !== 5) {
      throw new Error('geometry array must have 5 entries')
    }

    if (geometry[3][1] !== 0 || geometry[3][2] !== 0 || geometry[4][0] !== 0 || geometry[4][2] !== 0) {
      throw new Error('geometry 3 and 4 must be one dimensional geo[3] = [a,0,0] geo[4] = [0,b,0]')
    }

    this.V1_length_x_y = Math.sqrt((geometry[1][0] ** 2) + (geometry[1][1] ** 2))
    this.V4_length_x_y_z = Math.sqrt((geometry[4][0] ** 2) + (geometry[4][1] ** 2) + (geometry[4][2] ** 2))

    this.geometry = geometry

    // Absolute initial position of each Joint
    this.J_initial_absolute = []
    const tmpPos = [0, 0, 0]
    for (let i = 0; i < geometry.length; i++) {
      this.J_initial_absolute.push([tmpPos[0], tmpPos[1], tmpPos[2]])
      tmpPos[0] += geometry[i][0]
      tmpPos[1] += geometry[i][1]
      tmpPos[2] += geometry[i][2]
    }

    // Rotation: Angles of Joints. correction for initial position
    // 각 조인트 기준으로 초기 각도
    this.R_corrected = [0, 0, 0, 0, 0, 0]

    this.R_corrected[1] -= Math.PI / 2    //세워두는 용 (0이면 뒤로 누움) 
    this.R_corrected[1] += Math.atan2(geometry[1][0], geometry[1][1]) // correct offset bone

    this.R_corrected[2] -= Math.PI / 2    //90도 굽히는용 (0이면 꽂꽂히 섬)
    this.R_corrected[2] -= Math.atan2((geometry[2][1] + geometry[3][1]), (geometry[2][0] + geometry[3][0])) // correct offset bone V2,V3
    this.R_corrected[2] -= Math.atan2(geometry[1][0], geometry[1][1]) // correct bone offset of V1

    //[4][0]이 0이고 [4][1]이 보통 마이너스니까  0이라 - Math.PI / 2 고정이나 마찬가지
    this.R_corrected[4] += Math.atan2(geometry[4][1], geometry[4][0])
    //쫙펴진상태
    this.R_corrected[4] -= Math.PI/2


    //YS
    this.J_now = this.J_initial_absolute;

    this.monitor = [0,0,0,0,0,0];
    this.R3Turn = 0;
    this.R_old = this.R_corrected;
  }

  /**
   * calculateAngles - calculate robot angles based on TCP and geometry
   *
   * @param  {number} x             coordinate
   * @param  {number} y             coordinate
   * @param  {number} z             coordinate
   * @param  {number} a             euler angle rotation order abc
   * @param  {number} b             euler angle rotation order abc
   * @param  {number} c             euler angle rotation order abc
   * todo @param  {String} configuration S1 S2 S3
   * @return {Array}                angles
   */
  inverse(x, y, z, a, b, c) {
    if (this.debug) {
      console.log(x, y, z, a, b, c)
    }

    const ca = Math.cos(a)
    const sa = Math.sin(a)
    const cb = Math.cos(b)
    const sb = Math.sin(b)
    const cc = Math.cos(c)
    const sc = Math.sin(c)

    //corrected by YS
    //타겟 좌표계의 x축의 글로벌 좌표계에서는 방향이었던듯
    //타겟 좌표계가 abc방향으로 돌아간거니까 
    //반대로 (1,0,0)을 ZYX 방향으로 -c -b -a 순서로 돌렸었음 돌렸어야했는데..
    //계산된건 +c,+b,+a를 넣은거 같은데 왜이렇게 했지? 코드 잘 돌아가는데?
    //애초에 이 라이브러리가 각도 방향이 반대인듯?  
    // https://robot.glumb.de/ 여기서 애초에 반대로 돌아가네

    // const targetVectorX = [
    //   cb * cc,
    //   sc * ca + cc * sb * sa, 
    //   sc * sa - cc * sb * ca,
    // ]

    //맞네 얘도 방향 반대로 되어있었던거같음
    // const targetVectorX = [
    //   cb * cc,
    //   cb * sc, - sb,
    // ]

    // https://en.wikipedia.org/wiki/Rotation_matrix
    // R^-1 = R^T라 일일히 (Rx^T)(Ry^T)(Rz^T)(z) 계산할 필요없음 
    // 그냥 위키에있는 RzRyRx=R 에서 R^T 해서 쓰면 됨
    // targetVectorZ = ((RzRyRx)^T)*(0,0,1)
    // -c, -b -a 넣어줌

    const targetVectorZ = [
      sb,
      - sa * cb,
      ca * cb
    ];

    const R = [
      this.R_corrected[0],
      this.R_corrected[1],
      this.R_corrected[2],
      this.R_corrected[3],
      this.R_corrected[4],
      this.R_corrected[5],
    ]

    const J = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]

    // ---- J5 ----

    J[5][0] = x
    J[5][1] = y
    J[5][2] = z


    // ---- J4 ----
    // vector
    // 타겟 좌표계의 z방향을 V4방향으로참고해서 J4 위치계산 

    J[4][0] = x + this.V4_length_x_y_z * targetVectorZ[0]
    J[4][1] = y + this.V4_length_x_y_z * targetVectorZ[1]
    J[4][2] = z + this.V4_length_x_y_z * targetVectorZ[2]


    // ---- R0 ----
    // # J4
    // 구조상 J_initial_absolute[4][2] 값(로봇팔의 폭?)은 부분은 불변이라 이를 참고해서 R1,2로 인해 생길 변형 correction
    R[0] += Math.asin(this.J_initial_absolute[4][2] / Kinematics.length2(J[4][2], J[4][0]))
    //회전 각도
    R[0] += Math.atan2(-J[4][2], J[4][0])

    if (this.J_initial_absolute[4][2] > Kinematics.length2(J[4][2], J[4][0]) && this.debug) {
      console.log('out of reach')
    }

    // ---- J1 ----
    // # R0

    J[1][0] = Math.cos(R[0]) * this.geometry[0][0] + Math.sin(R[0]) * this.geometry[0][2]
    J[1][1] = this.geometry[0][1]
    J[1][2] = -Math.sin(R[0]) * this.geometry[0][0] + Math.cos(R[0]) * this.geometry[0][2]


    // ---- rotate J4 into x,y plane ----
    // # J4 R0
    // R1 R2 계산을 편하게 하고자 x,y평면으로 돌려놓고 계산

    const J4_x_y = []

    J4_x_y[0] = Math.cos(R[0]) * J[4][0] + -Math.sin(R[0]) * J[4][2]
    J4_x_y[1] = J[4][1]
    J4_x_y[2] = Math.sin(R[0]) * J[4][0] + Math.cos(R[0]) * J[4][2]

    // ---- J1J4_projected_length_square ----
    // # J4 R0

    const J1J4_projected_length_square = ((J4_x_y[0] - this.J_initial_absolute[1][0]) ** 2) + ((J4_x_y[1] - this.J_initial_absolute[1][1]) ** 2) // not using Math.sqrt

    // ---- R2 ----
    // # J4 R0

    const J2J4_length_x_y = Kinematics.length2(this.geometry[2][0] + this.geometry[3][0], this.geometry[2][1] + this.geometry[3][1])
    R[2] += Math.acos((-J1J4_projected_length_square + (J2J4_length_x_y ** 2) + (this.V1_length_x_y ** 2)) / (2.0 * (J2J4_length_x_y) * this.V1_length_x_y))

    // ---- R1 ----
    // # J4 R0

    const J1J4_projected_length = Math.sqrt(J1J4_projected_length_square)
    R[1] += Math.atan2((J4_x_y[1] - this.J_initial_absolute[1][1]), (J4_x_y[0] - this.J_initial_absolute[1][0]))
    R[1] += Math.acos((+J1J4_projected_length_square - (J2J4_length_x_y ** 2) + (this.V1_length_x_y ** 2)) / (2.0 * J1J4_projected_length * this.V1_length_x_y))

    // ---- J2 ----
    // # R1 R0

    const ta = Math.cos(R[0])
    const tb = Math.sin(R[0])
    const tc = this.geometry[0][0]
    const d = this.geometry[0][1]
    const e = this.geometry[0][2]
    const f = Math.cos(R[1])
    const g = Math.sin(R[1])
    const h = this.geometry[1][0]
    const i = this.geometry[1][1]
    const j = this.geometry[1][2]
    const k = Math.cos(R[2])
    const l = Math.sin(R[2])
    const m = this.geometry[2][0]
    const n = this.geometry[2][1]
    const o = this.geometry[2][2]

    J[2][0] = ta * tc + tb * e + ta * f * h - ta * g * i + tb * j
    J[2][1] = d + g * h + f * i
    J[2][2] = -tb * tc + ta * e - tb * f * h + tb * g * i + ta * j

    // ---- J3 ----
    // # R0 R1 R2
    //단순 위치계산

    J[3][0] = J[2][0] + ta * f * k * m - ta * g * l * m - ta * g * k * n - ta * f * l * n + tb * o
    J[3][1] = J[2][1] + g * k * m + f * l * m + f * k * n - g * l * n
    J[3][2] = J[2][2] - tb * f * k * m + tb * g * l * m + tb * g * k * n + tb * f * l * n + ta * o

    // ---- J4J3 J4J5 ----
    // # J3 J4 J5

    const J4J5_vector = [J[5][0] - J[4][0], J[5][1] - J[4][1], J[5][2] - J[4][2]]
    const J4J3_vector = [J[3][0] - J[4][0], J[3][1] - J[4][1], J[3][2] - J[4][2]]

    // ---- R3 ----
    // # J3 J4 J5

    const J4J5_J4J3_normal_vector = Kinematics.cross(J4J5_vector, J4J3_vector)
    
    //YS
    // const XZ_parallel_aligned_vector = [
    //   10 * Math.cos(R[0] + (Math.PI / 2)),
    //   0, -10 * Math.sin(R[0] + (Math.PI / 2)),
    // ]

    //TODO: xy평면으로 돌려놓고 R4를 -180~180 범위로 돌릴수 있게 정의하고
    //      그다음에 R3 정의? 레퍼런스를 r4 부호로?
    
    const XZ_parallel_aligned_vector = [  //vertical to robotArm,
      10 * Math.cos(R[0] + (Math.PI / 2)),
      0, 
      - 10 * Math.sin(R[0] + (Math.PI / 2)),    //이게 마이너스여야 잘되네?? why...
    ]
    
    //R4 의 방향을 결정해줄? 음수면 아래방향 
    const J4Config = Kinematics.dot(XZ_parallel_aligned_vector, J4J5_J4J3_normal_vector);
    // console.log(`J4Config: ${J4Config}`)
    let temp4 = Math.atan2(Kinematics.length3(J4J5_J4J3_normal_vector), Kinematics.dot(J4J5_vector, J4J3_vector));
    // console.log(`temp: ${temp}`)
    this.monitor[0] = temp4; //0 ~ PI
    //이거 기준을 다시 잡아야함 r3 값을 통할수 밖에 없을거같은데
    //R[3] 범위가 180 이내(-90~+90) 라면 이거만 있으도 됨
    //이외에서는 부호 다시 한번 역전되야함
    // if (J4Config < 0) R[4] -= temp4;   
    // else R[4] += temp4;
 
    R[4] += temp4;


    // targetVectorZ 와 Y축을 특정 평면에 정사영 시켰을때 각도 그평면의  normal vector는 J4J3_vector

    // let projectToPlane = function (v,n) {
    //   const nv = Kinematics.dot(v,n);
    //   return v.map((vi,i)=>(vi-nv*n[i]))
    //   // return [v[0]-nv*n[0], v[1]-nv*n[1], v[2]-nv*n[2]]
    // }

    // // console.log(`J4J3_vector: ${J4J3_vector}`)
    // const proj_Y = projectToPlane([0,1,0],J4J3_vector);
    // // console.log(`proj_Y: ${proj_Y}`)
    // let proj_Tz = projectToPlane(targetVectorZ,J4J3_vector);
    // // console.log(`proj_Tz:  ${proj_Tz.isArray}, ${proj_Tz}`)
    // if (J4Config < 0) proj_Tz = proj_Tz.map((v)=>-v); 

    // const norm = Kinematics.length3(Kinematics.cross(J4J5_J4J3_normal_vector, XZ_parallel_aligned_vector))
    // // const norm = Kinematics.length3(Kinematics.cross(proj_Y, proj_Tz))
    // // console.log(`norm: ${norm}`)
    // // console.log(`cross: ${Kinematics.cross(proj_Y,proj_Tz)}`)
    // // console.log(`dot:: ${Kinematics.dot(proj_Y,proj_Tz)}`)

    // // R[3] = Math.atan2(norm, (Kinematics.dot(proj_Y, proj_Tz)))
    // R[3] = Math.atan2(norm, (Kinematics.dot(J4J5_J4J3_normal_vector, XZ_parallel_aligned_vector)))

    // R[3] = Kinematics.angleBetween(proj_Y,proj_Tz,proj_Y);
    // R[3] = Kinematics.angleBetween(J4J5_J4J3_normal_vector, XZ_parallel_aligned_vector, XZ_parallel_aligned_vector)

    const reference = Kinematics.cross(XZ_parallel_aligned_vector, J4J3_vector) //바닥방향
    R[3] = Kinematics.angleBetween(J4J5_J4J3_normal_vector, XZ_parallel_aligned_vector, reference)
    this.monitor[1] = R[3]
    // console.log(`${R[3]},,,,${R[3]*180/Math.PI}`);
    if (R[3] > 3 ){
      if ((this.R_old[3] - 2*Math.PI*this.R3Turn) < -3) this.R3Turn -=1
    } else if (R[3] < -3){
      if ((this.R_old[3] - 2*Math.PI*this.R3Turn) > 3) this.R3Turn +=1
    }
    R[3] = R[3] + 2*Math.PI*this.R3Turn;
    if(Math.abs(R[3]) > 2*Math.PI) R[3] = R[3]>0 ?  2*Math.PI : -2*Math.PI;
    this.monitor[2] = R[3];
    this.monitor[3] = this.R3Turn;
    // ---- R4 ----
    // # J4 J3 J5

    // const referenceVector = Kinematics.cross(J4J3_vector, J4J5_J4J3_normal_vector)

    // R[4] += Kinematics.angleBetween(J4J5_vector, J4J3_vector, referenceVector)

    // ---- R5 ----
    // # J3 J4 J5

    // const targetVectorY = [
    //   sa * sb * cc - sc * ca,
    //   sa * sb * sc + cc * ca,
    //   sa * cb,
    // ]

    // YS
    const targetVectorY = [
      -sc * cb,
      cc * ca - sc * sb * sa,
      cc * sa + sc * sb * ca,
    ]

    R[5] -= Math.PI / 2
    // R[5] -= Kinematics.angleBetween(J4J5_J4J3_normal_vector, targetVectorY, Kinematics.cross(targetVectorY, targetVectorX))
    R[5] -= Kinematics.angleBetween(J4J5_J4J3_normal_vector, targetVectorY, Kinematics.cross(targetVectorY, targetVectorZ))

    // YS
    this.J_now = J;
    this.R_old = R;

    // --- return angles ---
    return R
  }

  calculateTCP(R0, R1, R2, R3, R4, R5, jointsResult) {
    const joints = this.calculateCoordinates(R0, R1, R2, R3, R4, R5)
    jointsResult[0] = joints[5][0]
    jointsResult[1] = joints[5][1]
    jointsResult[2] = joints[5][2]
    jointsResult[3] = joints[5][3]
    jointsResult[4] = joints[5][4]
    jointsResult[5] = joints[5][5]
  }


  /**
   * calculateCoordinates - calculate joint coordinates based on angles
   *
   * @param  {number} R0 angle for joint 0
   * @param  {number} R1 angle for joint 1
   * @param  {number} R2 angle for joint 2
   * @param  {number} R3 angle for joint 3
   * @param  {number} R4 angle for joint 4
   * @param  {number} R5 angle for joint 5
   * @return {Array}    [[x,z,z]...[x,y,z,a,b,c]]
   */
  forward(R0, R1, R2, R3, R4, R5) {
    const a = Math.cos(R0)
    const b = Math.sin(R0)
    const c = this.geometry[0][0]
    const d = this.geometry[0][1]
    const e = this.geometry[0][2]
    const f = Math.cos(R1)
    const g = Math.sin(R1)
    const h = this.geometry[1][0]
    const i = this.geometry[1][1]
    const j = this.geometry[1][2]
    const k = Math.cos(R2)
    const l = Math.sin(R2)
    const m = this.geometry[2][0]
    const n = this.geometry[2][1]
    const o = this.geometry[2][2]
    const p = Math.cos(R3)
    const q = Math.sin(R3)
    const r = this.geometry[3][0]
    const s = this.geometry[3][1]
    const t = this.geometry[3][2]
    const u = Math.cos(R4)
    const v = Math.sin(R4)
    const w = this.geometry[4][0]
    const x = this.geometry[4][1]
    const y = this.geometry[4][2]
    const A = Math.cos(R5)
    const B = Math.sin(R5)
    // const C = 0 // this.geometry[5][0]
    // const D = 0 // this.geometry[5][1]
    // const E = 0 // this.geometry[5][2]

    const jointsResult = [[], [], [], [], [], []]

    jointsResult[0][0] = 0
    jointsResult[0][1] = 0
    jointsResult[0][2] = 0

    jointsResult[1][0] = jointsResult[0][0] + a * c + b * e
    jointsResult[1][1] = jointsResult[0][1] + d
    jointsResult[1][2] = jointsResult[0][2] + -b * c + a * e

    jointsResult[2][0] = jointsResult[1][0] + a * f * h - a * g * i + b * j
    jointsResult[2][1] = jointsResult[1][1] + g * h + f * i
    jointsResult[2][2] = jointsResult[1][2] - b * f * h + b * g * i + a * j

    jointsResult[3][0] = jointsResult[2][0] + a * f * k * m - a * g * l * m - a * g * k * n - a * f * l * n + b * o
    jointsResult[3][1] = jointsResult[2][1] + g * k * m + f * l * m + f * k * n - g * l * n
    jointsResult[3][2] = jointsResult[2][2] - b * f * k * m + b * g * l * m + b * g * k * n + b * f * l * n + a * o

    jointsResult[4][0] = jointsResult[3][0] + a * f * k * r - a * g * l * r - a * g * k * p * s - a * f * l * p * s + b * q * s + b * p * t + a * g * k * q * t + a * f * l * q * t
    jointsResult[4][1] = jointsResult[3][1] + g * k * r + f * l * r + f * k * p * s - g * l * p * s - f * k * q * t + g * l * q * t
    jointsResult[4][2] = jointsResult[3][2] - b * f * k * r + b * g * l * r + b * g * k * p * s + b * f * l * p * s + a * q * s + a * p * t - b * g * k * q * t - b * f * l * q * t

    jointsResult[5][0] = jointsResult[4][0] + a * f * k * u * w - a * g * l * u * w - a * g * k * p * v * w - a * f * l * p * v * w + b * q * v * w - a * g * k * p * u * x - a * f * l * p * u * x + b * q * u * x - a * f * k * v * x + a * g * l * v * x + b * p * y + a * g * k * q * y + a * f * l * q * y
    jointsResult[5][1] = jointsResult[4][1] + g * k * u * w + f * l * u * w + f * k * p * v * w - g * l * p * v * w + f * k * p * u * x - g * l * p * u * x - g * k * v * x - f * l * v * x - f * k * q * y + g * l * q * y
    jointsResult[5][2] = jointsResult[4][2] - b * f * k * u * w + b * g * l * u * w + b * g * k * p * v * w + b * f * l * p * v * w + a * q * v * w + b * g * k * p * u * x + b * f * l * p * u * x + a * q * u * x + b * f * k * v * x - b * g * l * v * x + a * p * y - b * g * k * q * y - b * f * l * q * y

    const M = [
      [a * g * k * p * u + a * f * l * p * u - b * q * u + a * f * k * v - a * g * l * v,
        -B * b * p - B * a * g * k * q - B * a * f * l * q + A * a * f * k * u - A * a * g * l * u - A * a * g * k * p * v - A * a * f * l * p * v + A * b * q * v,
        A * b * p + A * a * g * k * q + A * a * f * l * q + B * a * f * k * u - B * a * g * l * u - B * a * g * k * p * v - B * a * f * l * p * v + B * b * q * v],
      [-f * k * p * u + g * l * p * u + g * k * v + f * l * v,
        B * f * k * q - B * g * l * q + A * g * k * u + A * f * l * u + A * f * k * p * v - A * g * l * p * v,
        -A * f * k * q + A * g * l * q + B * g * k * u + B * f * l * u + B * f * k * p * v - B * g * l * p * v],
      [-b * g * k * p * u - b * f * l * p * u - a * q * u - b * f * k * v + b * g * l * v,
        -B * a * p + B * b * g * k * q + B * b * f * l * q - A * b * f * k * u + A * b * g * l * u + A * b * g * k * p * v + A * b * f * l * p * v + A * a * q * v,
        A * a * p - A * b * g * k * q - A * b * f * l * q - B * b * f * k * u + B * b * g * l * u + B * b * g * k * p * v + B * b * f * l * p * v + B * a * q * v],
    ]

    // http://www.staff.city.ac.uk/~sbbh653/publications/euler.pdf

    let θ = 0
    let ψ = 0
    let φ = 0
    if (M[2][0] !== 1 || M[2][0] !== -1) {
      θ = Math.PI + Math.asin(M[2][0])
      ψ = Math.atan2(M[2][1] / Math.cos(θ), M[2][2] / Math.cos(θ))
      φ = Math.atan2(M[1][0] / Math.cos(θ), M[0][0] / Math.cos(θ))
    } else {
      φ = 0 // anything; can set to
      if (M[2][0] === -1) {
        θ = Math.PI / 2
        ψ = φ + Math.atan2(M[0][1], M[0][2])
      } else {
        θ = -Math.PI / 2
        ψ = -φ + Math.atan2(-M[0][1], -M[0][2])
      }
    }

    jointsResult[5][3] = ψ
    jointsResult[5][4] = θ
    jointsResult[5][5] = φ

    if (this.debug) {
      console.log('+++++++++forward KINEMATICS++++++++++')
      console.log(`J0 X ${jointsResult[0][0]} Y ${jointsResult[0][1]} Z ${jointsResult[0][2]}`)
      console.log(`J1 X ${jointsResult[1][0]} Y ${jointsResult[1][1]} Z ${jointsResult[1][2]}`)
      console.log(`J2 X ${jointsResult[2][0]} Y ${jointsResult[2][1]} Z ${jointsResult[2][2]}`)
      console.log(`J4 X ${jointsResult[4][0]} Y ${jointsResult[4][1]} Z ${jointsResult[4][2]}`)
      console.log(`J5 X ${jointsResult[5][0]} Y ${jointsResult[5][1]} Z ${jointsResult[5][2]}`)
      console.log(`J5 A ${jointsResult[5][3]} B ${jointsResult[5][4]} C ${jointsResult[5][5]}`)
      console.log(`---------forward KINEMATICS----------${jointsResult[1][1]}`)
    }

    return jointsResult
  }

  static cross(vectorA, vectorB) {
    return [
      vectorA[1] * vectorB[2] - vectorA[2] * vectorB[1],
      vectorA[2] * vectorB[0] - vectorA[0] * vectorB[2],
      vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0],
    ]
  }

  static dot(vectorA, vectorB) {
    return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1] + vectorA[2] * vectorB[2]
  }

  /**
   * @param  {Array} vectorA         angle from
   * @param  {Array} vectorB         angle to
   * @param  {Array} referenceVector angle to set 0 degree from. coplanar with vecA and vecB
   * @return {number}                 description
   * @example angleBetween([1,0,0],[0,1,0],[0,0,1]) // PI/2
   */
  static angleBetween(vectorA, vectorB, referenceVector) {
    // angle = atan2(norm(cross(a, b)), dot(a, b))

    const norm = Kinematics.length3(Kinematics.cross(vectorA, vectorB))

    const angle = Math.atan2(norm, (this.dot(vectorA, vectorB)))

    const tmp = referenceVector[0] * vectorA[0] + referenceVector[1] * vectorA[1] + referenceVector[2] * vectorA[2]

    const sign = (tmp > 0) ? 1.0 : -1.0

    return angle * sign
  }

  static length3(vector) {
    return Math.sqrt((vector[0] ** 2) + (vector[1] ** 2) + (vector[2] ** 2))
  }

  static length2(a, b) {
    return Math.sqrt((a ** 2) + (b ** 2))
  }

  stst
}

export {Kinematics};