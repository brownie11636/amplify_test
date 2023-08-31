ROBOTIS RH-P12-RN robot gripper
default coordinate is set for threeJS and UR5e ALLZERO configuration.

*ALLZERO configuration: UR5e's joint angles are all zero.

0: body_on bracket

1-0: link_CLmirror_and_LR
1-1: link_CL_and_LR

2: link_1_and_2
3: link_3
4: RUB_ASM

// /*  
//   gripperLinks configuration:
//   ROBOTIS RH-P12-RN:    // ⎟,⎿ means grouping structure in THREEJS
//   i   j   k   file  description      
//   0   -1  0   0     (body)  body_on_bracket
//   1   0   1   1-0   (right) ⎿ link_CLmirror_and_LR
//   2   0   2   2     (right) ⎿ link_1_and_2
//   3   0   3   3     (right) ⎟  ⎿ link_3
//   4   0   4   4     (right) ⎟     ⎿ RUB_ASM
//   5   1   1   1-1   (left)  ⎿ link_CL_and_LR
//   6   1   2   2     (left)  ⎿ link_1_and_2
//   7   1   3   3     (left)  ⎟  ⎿ link_3
//   8   1   4   4     (left)  ⎟     ⎿ RUB_ASM
// */


KARI
// /*  
//   gripperLinks configuration:
//   ROBOTIS RH-P12-RN:    // ⎟,⎿ means grouping structure in THREEJS
//   i   j   k   file  description      
//   0   -1  0   0     (body)  body_on_bracket
//   1   0   1   1-0   (right) ⎿ link_CLmirror_and_LR
//   2   0   2   2     (right) ⎿ link_1_and_2
//   3   0   3   3     (right) ⎟  ⎿ link_3
//   4   0   4   4-0   (right) ⎟     ⎿ RUB_ASM_KARI
//   5   1   1   1-1   (left)  ⎿ link_CL_and_LR
//   6   1   2   2     (left)  ⎿ link_1_and_2
//   7   1   3   3     (left)  ⎟  ⎿ link_3
//   8   1   4   4-1   (left)  ⎟     ⎿ RUB_ASM_KARI_1
// */