// variables
var results = $('#search-results');
var trackList = $('#tracklist');
var header = document.createElement('h4');

function getTracks(albumId) {
  $.ajax({
    url: 'https://api.spotify.com/v1/albums/' + albumId,
    success: function(response) {

      // adding class to body to show tracks
      $('body').addClass('show-tracks');

      // track variables
      var tracks = response.tracks.items;

      // clearing existing tracklist (to append new tracks)
      trackList.empty();

      header.innerHTML = response.name + " [" + tracks.length + "]";
      trackList.append(header);

      // retrieving tracks and appending them to tracklist
      for (var i=0; i<tracks.length; i++) {
        var trackName = tracks[i].name;
        var extLink = tracks[i].external_urls.spotify;
        var previewUrl = tracks[i].preview_url;
        var trackListItem = document.createElement('li');
        var spotifyLink = document.createElement('a');

        spotifyLink.innerHTML = "<i class='fa fa-play'></i>";
        spotifyLink.href = extLink;
        spotifyLink.setAttribute("target", "_blank");
        trackListItem.append(trackName);
        trackListItem.append(spotifyLink);
        trackList.append(trackListItem);
      };
    }
  });
};

function getAlbums(artist) {
  $.ajax({
     url: 'https://api.spotify.com/v1/search',
     data: {
       q: artist,
       type: 'album'
     },
     success: function(response) {

       // album variables
       var albums = response.albums.items;

       // clearing existing search results (to append new albums)
       results.empty();

       // retrieving associated albums and appending them to search results
       for (var i=0; i<albums.length; i++) {
         var albumImgUrl = albums[i].images[0].url;
         var albumId = albums[i].id;
         var album = document.createElement('img');
         album.src = albumImgUrl;
         album.classList.add("album");
         album.id = albumId;
         results.append(album);
       }

       // album click event to get tracks
       $('.album').click(function() {
         var albumId = this.id;
         getTracks(albumId);
       });
     }
  });
};

// click listener on close btn to close tracklist
$('#close-btn').click(function() {
  $('body').removeClass('show-tracks');
});

// click listener on album covers to get tracks
$('.album').click(function() {
  getTracks();
});

// click listener on search btn to get associated albums
$('#search-btn').click(function() {
  var artist = document.querySelector('#artist-query').value;
  getAlbums(artist);
});
