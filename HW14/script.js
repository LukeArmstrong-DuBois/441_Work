const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const shapes = [];
const velocities = [];

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const createShape = (geometry, color, position) => {
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    scene.add(mesh);
    shapes.push(mesh);

    velocities.push({
        x: Math.random() * 0.1 - 0.05,
        y: Math.random() * 0.1 - 0.05,
        z: Math.random() * 0.1 - 0.05
    });
};

const loader = new THREE.GLTFLoader();
loader.load('assets/OilCan.gltf', (gltf) => {
    const oilCan = gltf.scene;
    oilCan.scale.set(0.5, 0.5, 0.5); 
    oilCan.position.set(0, 0, 0); 
    scene.add(oilCan);
    shapes.push(oilCan);

    velocities.push({
        x: Math.random() * 0.1 - 0.05,
        y: Math.random() * 0.1 - 0.05,
        z: Math.random() * 0.1 - 0.05
    });
});


createShape(new THREE.BoxGeometry(), getRandomColor(), { x: 0, y: 0, z: 0 });
createShape(new THREE.SphereGeometry(), getRandomColor(), { x: 2, y: 1, z: -1 });
createShape(new THREE.ConeGeometry(), getRandomColor(), { x: -2, y: 0, z: 1 });
createShape(new THREE.CylinderGeometry(), getRandomColor(), { x: 1, y: -2, z: -2 });
createShape(new THREE.PlaneGeometry(), getRandomColor(), { x: -3, y: 0, z: 0 });
createShape(new THREE.TorusGeometry(1, 0.4, 16, 100), getRandomColor(), { x: 3, y: 2, z: -1 });
createShape(new THREE.OctahedronGeometry(), getRandomColor(), { x: -1, y: 3, z: 2 });

camera.position.z = 8;

const morphShape = (shape, index) => {
    const scaleFactor = 1 + Math.sin(Date.now() * 0.005 + index) * 0.3;
    shape.scale.set(scaleFactor, scaleFactor, scaleFactor);
};

const animate = () => {
    requestAnimationFrame(animate);

    shapes.forEach((shape, index) => {
        shape.position.x += velocities[index].x;
        shape.position.y += velocities[index].y;
        shape.position.z += velocities[index].z;

        if (shape.position.x > 4 || shape.position.x < -4) {
            velocities[index].x *= -1;
            shape.material?.color?.set(getRandomColor());
            shape.geometry?.applyMatrix4(new THREE.Matrix4().makeScale(1.1, 0.9, 1));
        }
        if (shape.position.y > 3 || shape.position.y < -3) {
            velocities[index].y *= -1;
            shape.material?.color?.set(getRandomColor());
            shape.geometry?.applyMatrix4(new THREE.Matrix4().makeScale(0.9, 1.1, 1));
        }
        if (shape.position.z > 4 || shape.position.z < -4) {
            velocities[index].z *= -1;
            shape.material?.color?.set(getRandomColor());
            shape.geometry?.applyMatrix4(new THREE.Matrix4().makeScale(1, 0.9, 1.1));
        }

        morphShape(shape, index);

        shape.rotation.x += 0.02;
        shape.rotation.y += 0.02;
    });

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
