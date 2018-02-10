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
        		<h3>UN JEU AMUSANT OU TU DOIS POSITIONNER UNE PHOTO SUR LA CARTE DE TA VILLE SANS TE TROMPER ET PLUS VITE QUE LES AUTRES !</h3><br><br><br>
     		</div>
 	</div>
	<!--1ère image-->
	<div class="row">
		<div class="col-10 col-sm-4"></div>
    		<div class="col-10 col-sm-4">
      			<p style="text-align:center;"><img src="/static/img/game.png" alt="game" id="game" align="middle" height="375" width="400"/></p>
    		</div>
    </div>
	<!--Formulaire pour le Pseudo-->
    <form @submit="recupPartie()">
    	<div class="row">
    		<div class="col-12 col-sm-4"></div>
    			<div class="col-12 col-sm-4">
      				<h4 for="pseudo"><b>Pseudo :</b></h4>
      				<input type="text" class="form-control" id="pseudo" placeholder="Inscrire votre Pseudo ici" v-model="pseudo"><br>
      			</div>
    	</div>
	<!--Bouton-->
		<div class="row">
			<div class="col-12 col-md-5"></div>
				<div class="col-12 col-md-2">
      				<input type="submit" class="btn btn-success btn-lg btn-block">Nouvelle Partie</input><br>
    			</div>
    	</div>
    </form>
	<!--Footer/Bas de Page-->
    <footer>
  		<p>Copyright &copy;2017 - GeoQuizz</p>
	</footer>

  </div>

</template>

<script>

export default {
  name: 'Accueil',
 
  data () {
    return {
     partie: [],
     //token,
	 pseudo: "",
     //serie: [],
     //photos: []
    };
  },
  mounted() {
    //this.recupPartie();
  },
  methods: {
    recupPartie() {
      window.axios
      .post("start", {
        joueur:this.pseudo
        })
      .then(response => { 
        this.partie = response.data;
        //this.token = response.data['token'];
        //this.serie = response.data['serie'];
        //this.photos = response.data['photos'];
	   console.table(response.data);
		 this.$router.push({path :'/partie/'+ response.data.token});

		 this.$store.commit('setToken',response.data.token);
          

        
      })
      .catch(error => {
          console.log(error)
          alert(error / response.data.error.joint("\n"));
      });
    }
  }
}
</script>

<style>
body{
	height: 100%;
	margin: 0;
	padding: 0;
	background-image:url(/static/img/world.jpg);
	-webkit-background-size: cover;
	background-size: cover;
	color: #FFD27F;
}

h1{
	font-family:Apple Chancery;
	color: #FFD27F;
}

h3{
	font-family:Monaco;
	text-align: center;
	color: #FFD27F;
}

h4{
	color:white;
	text-align: center;
}

p{
	text-align: center;
}

.icon-size{
   font-size:3em; 
}

</style>

