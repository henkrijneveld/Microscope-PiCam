<?PHP
// Maybe we will need this someday
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gem Camera</title>
  <link rel="stylesheet" href="css/style.css">
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript" src="js/axios.min.js"></script>
</head>
<body>
    <div id="microscopeapp">
      <div id="navbar">
        <div id="savefile">
          <save-file :filename="fname"></save-file>
          <a class="buttonstyle" target="_blank" href="php/filemanager">Shots</a>
          <a class="buttonstyle" @click="selectAll()">All panes</a>
          <a class="buttonstyle" @click="selectFilename()">Filename</a>
          <a class="buttonstyle" @click="selectSettings()">Camera settings</a>
          <a class="buttonstyle" @click="selectCamera()">Camera fullscreen</a>
          <div id="applogo">Camera on {{hostname}}</div>
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
  <script type="text/javascript" src="js/app.js"></script>
</body>
</html>
