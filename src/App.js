import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import RecordRTC from './RecordRTC'

function App() {
    const [disable, setDisable] = useState(false)
    const [video, setVideo] = useState()
    let recorder;

    function captureCamera(callback) {
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function (camera) {
            callback(camera);
        }).catch(function (error) {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error);
        });
    }

    function stopRecordingCallback() {
        const _video = video
        _video.src = _video.srcObject = null;
        _video.muted = false;
        _video.volume = 1;
        _video.src = URL.createObjectURL(recorder.getBlob());
        setVideo(_video)
        recorder.camera.stop();
        recorder.destroy();
        recorder = null;
    }

    const btnStopRecordingClickHandler = () => {
        setDisable(true);
        recorder.stopRecording(stopRecordingCallback);
    }
    const btnStartRecordingClickHandler = () => {
        setDisable(true);
        captureCamera(function (camera) {
            const _video = video
            _video.muted = true;
            _video.volume = 0;
            _video.srcObject = camera;
            setVideo(_video)
            recorder = RecordRTC(camera, {
                type: 'video'
            });

            recorder.startRecording();

            // release camera on stopRecording
            recorder.camera = camera;
            setDisable(false)
            // document.getElementById('btn-stop-recording').disabled = false;
        });
    }
    useEffect({
    }, [])
    return (
        <div className="App">
            <button id="btn-start-recording" onClick={btnStartRecordingClickHandler}>Start Recording</button>
            <button id="btn-stop-recording" onClick={btnStopRecordingClickHandler} disabled={disable}>Stop Recording
            </button>
            <video controls autoPlay playsInline/>
            <video autoPlay/>
        </div>
    );
}

export default App;
