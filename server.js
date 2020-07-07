const express = require('express');
const nunjucks = require('nunjucks');



const server = express();

const videos = require('./dataVideos');

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views",{
  express:server,
  autoescape:false,
  noCache:true
})

server.get('/', function(request, response){
  const data = {
    avatar_url:"https://avatars1.githubusercontent.com/u/62598805?s=460&u=be39aa9d611cfa852f701a36f145d7ba02e62ebd&v=4",
    name: "Fábio Abrantes",
    role: "professor de informática do IFPB - Campus Cajazeiras.",
    description: 'Professor das disciplinas de Linguagens de Script, programação Web 1,Programação para dispositivos móveis e Gestão de TI do <a href="https://estudante.ifpb.edu.br/cursos/12/" target="_blank" > Curso de ADS do IFPB - Campus Cajazeiras</a>',
    links: [
      {name:"GitHub", url:"https://github.com/fabioabrantes"},
      {name:"Twitter", url:"https://twitter.com/Fabinho_Bala"},
      {name:"Linkedin", url:"https://www.linkedin.com/in/fabio-abrantes-diniz-a1357221/"}
    ],
  }

  return response.render("about", {about:data});
});

server.get('/portfolio', function(request, response){
  
 return response.render("portfolio",{items:videos});
});

server.get('/video', function(request, response){
  const id = request.query.id;

  const video = videos.find(function(video){
   return video.id === id;
  });

  if (!video){
    return response.send("video not found");
  }

  return response.render("video", {item: video});
});

server.listen(5000,function(){
  console.log('server is running');
});
