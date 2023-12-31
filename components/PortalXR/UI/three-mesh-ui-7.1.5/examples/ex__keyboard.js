// xfg:title 			Keyboard
// xfg:category		practice
// xfg:group			interactive

/*

This example is an advanced demo.

For a better first step into this library, you should :
- check the tutorial at https://github.com/felixmariotto/three-mesh-ui/wiki/Getting-started
- consult more simple examples at https://three-mesh-ui.herokuapp.com/#basic_setup

*/

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import ThreeMeshUI from 'three-mesh-ui';
import ShadowedLight from './utils/ShadowedLight.js';

import FontJSON from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.json';
import FontImage from 'three-mesh-ui/examples/assets/fonts/msdf/roboto/regular.png';

import Backspace from 'three-mesh-ui/examples/assets/backspace.png';
import Enter from 'three-mesh-ui/examples/assets/enter.png';
import Shift from 'three-mesh-ui/examples/assets/shift.png';
import Stats from 'three/examples/jsm/libs/stats.module';
import InteractiveRaycaster from 'three-mesh-ui/examples/interactive/InteractiveRaycaster';
import InteractiveCursor from 'three-mesh-ui/examples/interactive/listeners/InteractiveCursor';
import KeyboardElement from 'three-mesh-ui/examples/elements/keyboard/KeyboardElement';
import QwertyEnglish from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertyEnglish';
import AzertyFrench from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/AzertyFrench';
import QwertzDeutsch from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertzDeutsch';
import QwertyGreek from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertyGreek';
import QwertyNordic from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertyNordic';
import QwertyRussian from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertyRussian';
import QwertySpanish from 'three-mesh-ui/examples/elements/keyboard/keyboard-layouts/QwertySpanish';
import VRControl from 'three-mesh-ui/examples/controls/VRControl';
import PhysicalKeyboardFeederBehavior from 'three-mesh-ui/examples/behaviors/input/PhysicalKeyboardFeederBehavior';
import KeyboardsSynchronizerBehavior from 'three-mesh-ui/examples/behaviors/input/KeyboardsSynchronizerBehavior';
import InteractiveTooltip from 'three-mesh-ui/examples/interactive/listeners/InteractiveTooltip';
import SimpleStateBehavior from 'three-mesh-ui/examples/behaviors/states/SimpleStateBehavior';

let scene,
	camera,
	renderer,
	controls,
	vrControl,
	keyboard,
	userText,
	intersectionRoom,
	layoutOptions,
	interactiveRaycaster,
	interactiveCursor,
	stats,
	keyboardSync;

// Colors

const colors = {
	keyboardBack: 0x858585,
	panelBack: 0x262626,
	button: 0x363636,
	hovered: 0x1c1c1c,
	selected: 0x109c5d
};

//

window.addEventListener( 'load', init );
window.addEventListener( 'resize', onWindowResize );

//////////////////
// THREE.JS INIT
//////////////////

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x505050 );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild( VRButton.createButton( renderer ) );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMap.enabled = true;

	// STATS


	stats = new Stats();
	stats.dom.style.left = 'auto';
	stats.dom.style.right = '0px';
	document.body.appendChild( stats.dom );


	// LIGHT

	const light = ShadowedLight( {
		z: 10,
		width: 6,
		bias: -0.0001
	} );

	const hemLight = new THREE.HemisphereLight( 0x808080, 0x606060 );

	scene.add( light, hemLight );

	// CONTROLLERS

	controls = new OrbitControls( camera, renderer.domElement );
	camera.position.set( 0, 1.6, 0 );
	controls.target = new THREE.Vector3( 0, 1.2, -1 );
	controls.update();

	//

	vrControl = new VRControl( renderer );
	scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

	interactiveRaycaster = new InteractiveRaycaster( camera, scene, renderer, vrControl );

	interactiveCursor = new InteractiveCursor( renderer.domElement );
	interactiveRaycaster.addListener( interactiveCursor );

	const interactiveTooltip = new InteractiveTooltip( renderer.domElement );
	interactiveRaycaster.addListener( interactiveTooltip );

	interactiveRaycaster.start();

	// ROOM

	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);

	intersectionRoom = new THREE.Mesh(
		new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
		new THREE.MeshBasicMaterial( {
			side : THREE.BackSide,
			transparent: true,
			opacity: 0
		} )
	);

	scene.add( room, intersectionRoom );

	// USER INTERFACE

	makeUI();

	// LOOP

	renderer.setAnimationLoop( loop );

}

//

function makeUI() {

	const container = new THREE.Group();
	container.position.set( 0, 1.4, -1.2 );
	container.rotation.x = -0.15;
	scene.add( container );

	//////////////
	// TEXT PANEL
	//////////////

	const textPanel = new ThreeMeshUI.Block( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		width: 1,
		height: 0.32,
		padding: 0.02,
		backgroundColor: new THREE.Color( colors.panelBack ),
		backgroundOpacity: 1
	} );

	textPanel.position.set( 0, -0.15, 0 );
	container.add( textPanel );

	//

	const title = new ThreeMeshUI.Text( {
		width: 1,
		height: 0.1,
		justifyContent: 'center',
		fontSize: 0.045,
		textContent: 'Type some text on the keyboard'
	} )

	userText = new ThreeMeshUI.Text( {
		width: 1,
		// height: 0.4,
		fontSize: 0.033,
		padding: 0.02,
		boxSizing: 'border-box',
		textContent: "",
		textAlign: 'center'
	} );

	// add keyboard input to userText
	const feeder = new PhysicalKeyboardFeederBehavior( userText );
	feeder.attach();

	textPanel.add( title, userText );

	////////////////////////
	// LAYOUT OPTIONS PANEL
	////////////////////////

	// BUTTONS

	let layoutButtons = [
		[ 'English', QwertyEnglish ],
		[ 'Nordic', QwertyNordic ],
		[ 'German', QwertzDeutsch ],
		[ 'Spanish', QwertySpanish ],
		[ 'French', AzertyFrench ],
		[ 'Russian', QwertyRussian ],
		[ 'Greek', QwertyGreek ]
	];

	layoutButtons = layoutButtons.map( ( options ) => {

		const button = new ThreeMeshUI.Text( {

			name: 'switch keyboard layout to '+options[ 0 ],
			// height: 0.06,
			width: 'auto',
			padding : '0.01 0.05',
			margin: 0.012,
			justifyContent: 'center',
			// backgroundColor: new THREE.Color( colors.button ),
			backgroundColor: colors.button ,
			offset: 0.01,
			backgroundOpacity: 1,
			fontSize: 0.035,
			textContent: options[ 0 ]
		} );

		new SimpleStateBehavior( button, {
			hover: {
				offset: 0.02,
				backgroundColor: colors.hovered,
			},
			checked: {
				backgroundColor: colors.selected,
			},
		});


		button.addEventListener( 'click' , () => {

			if ( keyboard ) {

				interactiveRaycaster.removeObject( keyboard );
				keyboard.clear();

				keyboardSync.detach();
				keyboardSync = null;

			}

			for ( let i = 0; i < layoutButtons.length; i++ ) {
				const layoutButton = layoutButtons[ i ];
				layoutButton.deactivatePseudoState('checked');
			}

			button.activatePseudoState('checked');

			makeKeyboard( options[ 1 ] );

		});

		interactiveRaycaster.addObject( button );

		return button;

	} );

	// CONTAINER

	layoutOptions = new ThreeMeshUI.Block( {
		fontFamily: FontJSON,
		fontTexture: FontImage,
		padding: 0.02,
		width: 1,
		// offset: 0,
		backgroundColor: new THREE.Color( colors.panelBack ),
		backgroundOpacity: 1
	} ).add(
		new ThreeMeshUI.Text( {
			// offset: 0,
			justifyContent: 'center',
			backgroundOpacity: 0,
			fontSize: 0.04,
			textContent: 'Select a keyboard layout :'
		} ),

		new ThreeMeshUI.Block( {
			height: 0.075,
			width: 1,
			// offset: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			backgroundOpacity: 0
		} ).add(
			layoutButtons[ 0 ],
			layoutButtons[ 1 ],
			layoutButtons[ 2 ],
			layoutButtons[ 3 ]
		),

		new ThreeMeshUI.Block( {
			height: 0.075,
			width: 1,
			// offset: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			backgroundOpacity: 0
		} ).add(
			layoutButtons[ 4 ],
			layoutButtons[ 5 ],
			layoutButtons[ 6 ]
		)
	);

	layoutOptions.position.set( 0, 0.2, 0 );
	container.add( layoutOptions );

	// Set English button as selected from the start
	makeKeyboard();

}

/*

Create a keyboard UI with three-mesh-ui, and assign states to each keys.
Three-mesh-ui strictly provides user interfaces, with tools to manage
UI state (component.setupState and component.setState).

It does not handle interacting with the UI. The reason for that is simple :
with webXR, the number of way a mesh can be interacted had no limit. Therefore,
this is left to the user. three-mesh-ui components are THREE.Object3Ds, so
you might want to refer to three.js documentation to know how to interact with objects.

If you want to get started quickly, just copy and paste this example, it manages
mouse and touch interaction, and VR controllers pointing rays.

*/

function makeKeyboard( layout = null ) {

	keyboard = new KeyboardElement( {
		// the default layout to display
		layout : layout ? layout : QwertyEnglish,
		// can detect automatically which layout to use
		autoDetectLayout : !layout,
		// between this list of keyboard layouts
		availableLayouts : [QwertyEnglish,AzertyFrench,QwertzDeutsch, QwertyGreek, QwertyNordic, QwertyRussian],

		fontFamily: FontJSON,
		fontTexture: FontImage,
		fontSize: 0.035, // fontSize will propagate to the keys blocks
		backgroundColor: new THREE.Color( colors.keyboardBack ),
		backgroundOpacity: 1,
		backspaceTexture: Backspace,
		shiftTexture: Shift,
		enterTexture: Enter,
		keyOptions : {
			color: 0xffffff,
			backgroundColor: colors.button,
			backgroundOpacity:1,
			borderRadius: 0.01,
			offset: 0.0085
		}
	} );

	keyboard.position.set( 0, 0.88, -1 );
	keyboard.rotation.x = -0.55;

	keyboard.interactiveListener.bindText( userText )

	scene.add( keyboard );

	interactiveRaycaster.addObject( keyboard );

	// Report physicalKeyboard even to virtual keyboard
	keyboardSync = new KeyboardsSynchronizerBehavior( keyboard );
	keyboardSync.attach();


	// styles for keys
	keyboard.keys.forEach( ( key ) => {

		new SimpleStateBehavior(key,{
			hover: {
				backgroundColor: colors.hovered,
				backgroundOpacity: 1,
			},
			checked:{
				backgroundColor: 0x00ff99
			},
			active: {
				offset: 0.0025,
				backgroundColor: colors.hovered,
			}
		});

	});
}

//

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function loop() {

	// Don't forget, ThreeMeshUI must be updated manually.
	// This has been introduced in version 3.0.0 in order
	// to improve performance
	ThreeMeshUI.update();
	controls.update();
	interactiveRaycaster.update();

	stats.update();



	renderer.render( scene, camera );

}
