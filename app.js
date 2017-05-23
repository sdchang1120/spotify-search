// variables
var results = $("#search-results");
var trackList = $("#tracklist");
var header = document.createElement("h4");

// get tracks associated to clicked album
function getTracks(albumId) {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: function(response) {

      var tracks = response.tracks.items;

      // clearing existing tracklist (to append new tracks)
      trackList.empty();

      // adding header to tracklist -- Album Name [# of tracks]
      header.innerHTML = response.name + " [" + tracks.length + "]";
      trackList.append(header);

      // adding class to body to show tracks
      $("body").addClass("show-tracks");


      // wrapping tracks in elements to adding tracklist
      for (var i=0; i<tracks.length; i++) {
        var trackLiTag = document.createElement('li');
        var trackATag = document.createElement('a');
        trackATag.innerHTML = "<i class='fa fa-play'></i>";
        trackATag.href = tracks[i].external_urls.spotify;
        trackATag.setAttribute("target", "_blank");
        trackLiTag.append(tracks[i].name);
        trackLiTag.append(trackATag);
        trackList.append(trackLiTag);
      };
    }
  });
};

// get albums associated to entered artist
function getAlbums(artist) {
  $.ajax({
     url: "https://api.spotify.com/v1/search",
     data: {
       q: artist,
       type: "album"
     },
     success: function(response) {

       var albums = response.albums.items;

       // clearing existing search results (to append new albums)
       results.empty();

       // retrieving associated albums and appending them to search results
       for (var i=0; i<albums.length; i++) {
         var album = document.createElement("img");
         album.src = albums[i].images[0].url;
         album.classList.add("album");
         album.id = albums[i].id;
         results.append(album);
       }

       // when user clicks on album cover
       $(".album").click(function() {
         var albumId = this.id;
         getTracks(albumId);
       });
     }
  });
};

// when user clicks on close btn on tracklist
$("#close-btn").click(function() {
  $("body").removeClass("show-tracks");
});

// when user clicks on search btn
$("#search-btn").click(function() {
  var artist = document.querySelector("#artist-query").value;
  getAlbums(artist);
});
