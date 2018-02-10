<template>

	<!--Titre-->
	<div class="row">
    	<div class="col-md-12">
    		<div class="col-md-4">
      			<h1><b>GeoQuizz</b> <span class="glyphicon glyphicon-globe"></span><span class="glyphicon glyphicon-map-marker"></span></h1>  
  			</div>
    	</div>
		<!--Sous Texte-->
		<div class="row">
			<div class="col-12 col-sm-3"></div>
    			<div class="col-12 col-sm-6">
        			<h3>UN JEU AMUSANT OU TU DOIS POSITIONNER UNE PHOTO SUR LA CARTE DE TA VILLE SANS TE TROMPER ET PLUS VITE QUE LES AUTRES !</h3>
     			</div>
 		</div>
		<!--Sous Texte 2-->
 		<div class="row">
			<div class="col-12 col-sm-3"></div>
    			<div class="col-12 col-sm-6">
        			<h3>Clic sur la carte pour définir où se trouve de la photo !</h3>
     			</div>
 		</div>
		<!--Carte du Jeu-->
		<div class="row">
    		<div class="col-6 col-sm-1"></div>
    			<div class="col-6 col-sm-6">
        			<h3>Carte du Jeu <span class="glyphicon glyphicon-road"></span></h3>
        			<div id="map">
                        <!-- Début de VUeJS -->
                <gmap-map
                            v-on:model="map"
                            v-on:click="ajouterMarker"
                            :center="center"
                            :zoom="13"
                            :draggable="false"
                            style="width: 100%; height: 100%"
                            
                            
                >
                        <gmap-marker
                        :key="index"
                        v-for="marker in markers"
                        :position="marker.position"
                        :clickable="true"
                        :draggable="true"
                        
                        @click="center=marker.position"
                        ></gmap-marker>
                </gmap-map>


                    </div>
        		</div>
				<!--
                    Ajout pour bloquer le zoom :
                        :navigationControl="false"
                        :mapTypeControl="false"
                        :scaleControl="false"
                        mettre draggable à false
                    
                    Emplacement pour les photos-->
      			<h3>Photos <span class="glyphicon glyphicon-picture"></span></h3>
      			<div id="map2">

            <image-element :image="imageEnCours"/>

            </div>
				<!--Bouton Valider-->
      			<div class="col-12 col-sm-4"><br>
      				<button type="button" id="button" class="btn btn-success btn-lg btn-block" @click="montrerPhoto()">Valider</a></button><br>
      				<button type="button" id="button" class="btn btn-danger btn-lg btn-block">Annuler</button>
      			</div>
  		</div>
		<!--Emplacement du Timer-->
  		<div class="row">
  			<div class="col-6 col-sm-8">
  				 <timer-element></timer-element>
  			</div>
  		</div>
  		<!--Bas de Page-->
  		<footer>
  			<p>Copyright &copy;2017 - GeoQuizz</p>
		</footer>
  	</div>
</template>
  



<script>

import ImageElement from "./ImageElement.vue"
import TimerElement from "./TimerElement.vue"
import * as VueGoogleMaps from "vue2-google-maps";
import Vue from "vue";
Vue.use(VueGoogleMaps, {
  load: {
    
    key: "AIzaSyDW6k5H-IUwCs5HrPIUWz0NWfC41fQWz2Y",
    libraries: 'geometry',
    v: "3.26"
  }
});
export default {
  name: "Partie",
  components: {ImageElement, TimerElement},

  data() {
    return {
      photos: [],
      imageEnCours:"",
      imagePosition:0,
      imageLat:0,
      imageLong:0,
      center: { lat: 49.109778, lng: 6.159414 },
      markers: [],
      realPosition: {},
      userPosition: {},
      map: "",
      leTimer:''
    };
  },
  mounted() {
    window.axios
      .get("start/" + this.$route.params.id)
      .then(response => {
        this.photos = response.data;
        console.table(response.data);
        this.montrerPhoto();
      })
      .catch(error => {
        alert(error / response.data.error.joint("\n"));
      });
      
     
      
  },
  methods: {
    montrerPhoto() {
      this.arretTimer();
      this.imageEnCours = this.photos[this.imagePosition].url;
      this.imageLat = this.photos[this.imagePosition].latitude;
      this.imageLong = this.photos[this.imagePosition].longitude;
      this.imagePosition++;

      var _this = this;
      let seconds = 20;
      this.leTimer = setInterval(function(){
          console.log("RANDOM");
          if(seconds > 0){
            seconds--;
          }else{
            _this.arretTimer();
            _this. _resetMarkers();
            _this._montrerPhoto();
           
          }
          _this.$store.commit('setTime', seconds);}, 1000);
    
      
    },
      arretTimer(){
        clearInterval(this.leTimer);
      },
      _resetMarkers() {
      this.markers= [];
      },
      _montrerPhoto() {
      this.montrerPhoto();
      },




    ajouterMarker(event) {

      let newMarker = {
        position: {
          lat: parseFloat(event.latLng.lat()),
          lng: parseFloat(event.latLng.lng())
        }
      };
      this.markers.push(newMarker);

      this.realPosition = {lat : this.imageLat, lng: this.imageLong}
      this.userPosition = {lat: this.markers[this.markers.length-1].position.lat, lng: this.markers[this.markers.length-1].position.lng};
      this.evaluateDistance(this.getDistance(this.realPosition, this.userPosition));
    },

      getDistance(realPosition, userPosition) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(this.realPosition.lat, this.realPosition.lng),
      new google.maps.LatLng(this.userPosition.lat, this.realPosition.lng
    )) 
      return distance
      
      
    },

    evaluateDistance(distance) {
      let userDistance = parseFloat(distance);
      let serieDistance = parseFloat(88);
      let score = 0
      if(userDistance <= serieDistance) {
        score=5;
      }
      else
      {
        score=0;
      }
      return score;
    },

    validerResultat() {
      let nvScore = this.evaluateDistance(this.getDistance(this.realPosition, this.userPosition));
      alert("Vous avez gagné "+ newScore);
      this.$store.commit('setScore',nvScore);
      this.$store.commit('setScoreCumul',nvScore)
    }
    
  }
};
</script>

<style>
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url(/static/img/world.jpg);
  -webkit-background-size: cover;
  background-size: cover;
  color: #ffd27f;
}

h1 {
  font-family: Apple Chancery;
   color: #ffd27f;
}

h2 {
  font-family: Monaco;
  text-align: left;
   color: #ffd27f;
}

h3 {
  font-family: Monaco;
  text-align: center;
   color: #ffd27f;
}

h4 {
  color: white;
  text-align: center;

}

p {
  text-align: center;
}

#button {
  width: 400px;
  height: 50px;
  margin-left: 100px;
}

.icon-size {
  font-size: 3em;
}

#map {
  width: 800px;
  height: 400px;
  background: white;
  border: 1px solid #ffd27f;
  margin-right: 10px;
  float: left;
}

#map2 {
  width: 300px;
  height: 200px;
  background: white;
  border: 1px solid #ffd27f;
  margin-right: 10px;
  float: right;
}

#map,
#map2 {
  display: inline;
  margin-right: 160px;
}
</style>