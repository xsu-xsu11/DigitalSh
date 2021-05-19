function setPickPosition(event, renderer) {
    let pickPosition = new THREE.Vector3();
    const canvas = renderer.domElement;
    const pos = getCanvasRelativePosition(event, canvas);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
    return pickPosition;
}

function getCanvasRelativePosition(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (event.touches) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    return {
        x: (x - rect.left) * canvas.width / rect.width,
        y: (y - rect.top) * canvas.height / rect.height,
    };
}

function pick(normalizedPosition, cars, camera, complexObject) {

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(normalizedPosition, camera);
    let position = [];
    let object = {};
    const intersectedObjects = raycaster.intersectObject(cars, true);
    if (intersectedObjects.length) {
      if (complexObject) {
        let obj=intersectedObjects[0].object;
        while (true) {
          if (obj.parent.type === 'Group') {
            position = [obj.position.x, obj.position.y];
            break;
          }
          obj = obj.parent;
        }
      } else {
        position = [intersectedObjects[0].object.position.x, intersectedObjects[0].object.position.y, intersectedObjects[0].object.position.z];
      }
      object = intersectedObjects[0].object;
      return { object, position };
    }
  }