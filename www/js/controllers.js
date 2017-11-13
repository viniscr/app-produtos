angular.module('starter.controllers', [])



.controller('ProdutoController', function($scope,$ionicModal,$ionicPopup,$localStorage) {
  var produtosPadrao = [
    { titulo: 'Livro de Ionic', valor: 50.99, publicar:true },
    { titulo: 'Livro de Angular JS', valor: 40.99, publicar:true },
    { titulo: 'Livro de Cordova', valor: 30.99, publicar:true }
    
  ];

  $scope.local = $localStorage;

  //$scope.local.titulo = "Esse é o meu título";

  var init = function(){
      if(!$scope.local.produtos){
        $scope.local.produtos = produtosPadrao;
        $scope.produtos = $scope.local.produtos;
      }else{
        $scope.produtos = $scope.local.produtos;
      }
      
  };




  $ionicModal.fromTemplateUrl('templates/adicionar.html',{
  	scope:$scope
  }).then(function(modal){
  	$scope.modal = modal;
  });

  $scope.abreAdicionar = function(){
  	$scope.editando = false;
  	$scope.Produto.titulo = "";
  	$scope.Produto.valor = "";
  	$scope.Produto.publicar = false;
  	$scope.modal.show();
  }

  $scope.addProduto = function(Produto){
    if(!validacao(Produto)){
      return;
    }
  	$scope.produtos.push({titulo: Produto.titulo, valor: Produto.valor, publicar:Produto.publicar});
  	Produto.titulo = "";
  	Produto.valor = "";
  	Produto.publicar = false;
  	$scope.modal.hide();
  }

  $scope.Produto = {titulo:"",valor:"",publicar:false};
  $scope.editando = false;
  var auxProdutoEditar;

  $scope.editarProduto = function(ProdutoEditar){
  	$scope.editando = true;
  	$scope.Produto.titulo = ProdutoEditar.titulo;
  	$scope.Produto.valor = ProdutoEditar.valor;
  	$scope.Produto.publicar = ProdutoEditar.publicar;
  	auxProdutoEditar = ProdutoEditar;
  	$scope.modal.show();
  };

  $scope.salvarProduto = function(Produto){
    if(!validacao(Produto)){
      return;
    }
  	auxProdutoEditar.titulo = Produto.titulo;
  	auxProdutoEditar.valor = Produto.valor;
  	auxProdutoEditar.publicar = Produto.publicar;
  	$scope.modal.hide();
  };

  $scope.deletarProduto = function(Produto){
    for(var index in $scope.produtos){
      var aux = $scope.produtos[index];
      if(Produto === aux){
        $scope.produtos.splice(index,1);
      }
    }
  };

  $scope.deletando = false;

  var validacao = function(Produto){

    var textoErro = "";
    var existeErro = false;

    if(Produto.titulo === ""){
      existeErro = true;
      textoErro += "<p>Preencha um título válido</p>";
    }

    if(Produto.valor === ""){
      existeErro = true;
      textoErro += "<p>Preencha um valor válido</p>";
    }

    if(existeErro){
      var alertPopup = $ionicPopup.alert({
        title:"Erro no Formulário",
        template: textoErro
      });
      return false;
    }else{
      return true;
    }

    
  };

  init();


})

