<?PHP
// Maybe we will need this someday
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gem Camera</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
  <link rel="manifest" href="assets/site.webmanifest">
  <link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#2b5797">
  <meta name="theme-color" content="#ffffff">
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript" src="js/axios.min.js"></script>
</head>
<body>
    <div id="microscopeapp">
      <div id="navbar">
        <div id="savefile">
          <save-file :filename="fname">Shoot & Download</save-file>
          <a class="buttonstyle" target="_blank" href="php/filemanager">Shots</a>
          &nbsp;&nbsp;
          <a class="buttonstyle" @click="selectAll()">All</a>
          <a class="buttonstyle" @click="selectFilename()">File</a>
          <a class="buttonstyle" @click="selectSettings()">Settings</a>
          <a class="buttonstyle" @click="selectCamera()">Camera only</a>
          &nbsp;&nbsp;
          <re-start>Start camera</re-start>
          <shut-down>Shutdown PI</shut-down>
          <div id="applogo">{{hostname}}</div>
        </div>
      </div>
      <div class="container" :class="displayLayout" ref="gridcontainer">
        <div class="camera" id="camerapicture">
          <zoomable-image :maxwidth="camerawidth"></zoomable-image>
        </div>
        <div class="file" id="filename">
          <file-name v-on:setfname="fname = $event">Filename</file-name>
        </div>
        <div class="settings" id="settings">
          <settings-pane>Camera settings</settings-pane>
          <histo-gram :sourceimg="'zi-campic'"></histo-gram>
        </div>
      </div>
    </div>
  <script type="text/javascript" src="config/config.js"></script>
  <script type="text/javascript" src="config/config.overrides.js"></script>
  <script type="text/javascript" src="js/histogram.js"></script>
  <script type="text/javascript" src="js/numberinput.js"></script>
  <script type="text/javascript" src="js/selectinput.js"></script>
  <script type="text/javascript" src="js/buttonbar.js"></script>
  <script type="text/javascript" src="js/filename.js"></script>
  <script type="text/javascript" src="js/zoomableimage.js"></script>
  <script type="text/javascript" src="js/settings.js"></script>
  <script type="text/javascript" src="js/save-file.js"></script>
  <script type="text/javascript" src="js/restart.js"></script>
  <script type="text/javascript" src="js/shutdown.js"></script>
  <script type="text/javascript" src="js/app.js"></script>
</body>
</html>
