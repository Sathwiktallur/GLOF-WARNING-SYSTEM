import * as THREE from 'three';
import type { GlacialLake } from '@shared/schema';

export class GlobeVisualization {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private globe: THREE.Mesh;
  private markers: THREE.Mesh[] = [];
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  
  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);
    
    // Create globe
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'),
      bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_bumpmap.jpg'),
      bumpScale: 0.05,
    });
    
    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(ambientLight, directionalLight);
    
    this.camera.position.z = 15;
    
    // Setup raycasting
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    // Start animation
    this.animate();
  }

  private latLongToVector3(lat: number, long: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  public addMarkers(lakes: GlacialLake[]): void {
    this.markers.forEach(marker => this.scene.remove(marker));
    this.markers = [];
    
    lakes.forEach(lake => {
      const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: lake.riskLevel === 'high' ? 0xff0000 : 
               lake.riskLevel === 'medium' ? 0xffff00 : 0x00ff00 
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      const position = this.latLongToVector3(lake.latitude, lake.longitude, 5.1);
      marker.position.copy(position);
      
      this.markers.push(marker);
      this.scene.add(marker);
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    
    this.globe.rotation.y += 0.001;
    this.renderer.render(this.scene, this.camera);
  };

  public onResize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
