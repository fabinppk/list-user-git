function listarRepos(button){
  var login = $(button).attr('data-login');
  $.ajax({
      url: 'https://api.github.com/users/' + login+ '/repos',
      method: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({ name: login }),
      success: function(response) {
        $("#repos").html("");
        $("#repos").append(
          "<h2>Lista de Repositórios</h2>"
        );
        for(var i=0;i< response.length;i++){
          $("#repos").append(
            `<button class='hero' onclick='getRepo("${response[0].owner.login}", "${response[i].name}")'>${response[i].name}</button>`
          );
        }
      }
  });
}

function getRepo(user, repo){
  $.ajax({
      url: 'https://api.github.com/repos/' + user + '/' + repo,
      method: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({ name: user }),
      success: function(response) {
          url = "/usuario/"+ response.owner.login + "/" + response.name;
          history.pushState("", "/", url);
          $("body").html("");
          $("body").append(
            templateRepoPage(response.name, response.description, response.stargazers_count, response.language, response.svn_url)
          );
      }
  });
}

function templateRepoPage(name, description, star, language, link_externo){
  return `<h1>Detalhes do Repositório</h1>
          <div class='block-hero'>
            <div class='hero'>
              <h2 class='nome'>${name}</h2>
              <p class='descricao'>Descrição: ${description}</p>
              <p class='cargo'>Stars: ${star}</p>
              <a class='cargo' href='${link_externo}' target='_blank'>On Github ${name}</a>
            </div>
          </div>`;
}

function templateUsuarioPage (nome, img, bio, login){
  return  `<h1>Detalhes do Usuário</h1>
            <div class='block-hero'>
            <div class='hero'>
              <h2 class='nome'>${nome}</h2>
              <img src='${img}' alt='${nome}'>
              <p class='cargo'>Bio: ${bio}</p>
              <p class='login'>Login: ${login}</p>
            </div>
            <button onclick='listarRepos(this)' data-login='${login}' type='button'>Listar Repositórios</button>
            <div id='repos'></div>
          </div>`;
};

$(function() {
    $('#busca-usuario').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#user-input');

        $.ajax({
            url: 'https://api.github.com/users/' + createInput.val(),
            method: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                url = "usuario/" + response.login;
                history.pushState("", "", url);
                $("body").html("");
                $("body").append(
                  templateUsuarioPage(response.name, response.avatar_url, response.bio, response.login)
                );
            }
        });
    });
});
