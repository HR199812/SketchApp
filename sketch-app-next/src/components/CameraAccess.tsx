export default function CameraAcess() {
  return (
    <>
      <div className="CameraAccess">
        <ul>
          <li>
            <button className="CloseCameraAccessButton">X</button>
          </li>
        </ul>
        <div>
          <video id="video"></video>
          <canvas id="CameraCanvas"></canvas>
        </div>
        <div>
          <button id="snap" title="Snap"></button>
        </div>

        <div className="photoContainer">
          {/* <img className="photos"></img> */}
        </div>
        <div>
          <button className="AddSnappedImageToCanvas">Add</button>
        </div>
      </div>
    </>
  );
}
