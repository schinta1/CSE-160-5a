import * as THREE from '../lib/three.module.js';
 
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 120;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();
    
	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry_1 = new THREE.ConeGeometry(0.5, 1, 16);
    const geometry_2 = new THREE.CylinderGeometry(0.5, 0.5, 1, 50);
    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'wall.jpg' );
    texture.colorSpace = THREE.SRGBColorSpace;

    function makeInstance( geometry, x ) {

		const material = new THREE.MeshPhongMaterial( { map:texture } );

		const mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

		mesh.position.x = x;

		return mesh;

	}
	const cubes = [
		makeInstance( geometry, 0 ),
		makeInstance( geometry_1, - 2 ),
		makeInstance( geometry_2, 2 ),
	];
    
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    //const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    //const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // renderer.render(scene, camera);
    function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}
    function render(time) {
        time *= 0.001;  // convert time to seconds
        if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}
        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * .1;
          const rot = time * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
       
    
    // function render(time) {

    //     time *= 0.001;  // convert time to seconds
       
    //     cube.rotation.x = time;
    //     cube.rotation.y = time;
       
    //     renderer.render(scene, camera);
       
    //     requestAnimationFrame(render);
    // }
    
}
requestAnimationFrame(render);
}

main();