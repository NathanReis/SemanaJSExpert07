# JSExpertMax Gesture Controller - Semana JS Expert 7.0

Projeto para iteração com a interface utilizando gestos identificados com machine learning.

100% front-end.

Projeto original: https://github.com/ErickWendel/semana-javascript-expert07

## Preview

<img width=100% src="./assets/demo-template-lg.gif">

## Pre-reqs

- Este projeto foi criado usando Node.js v18
- Utilizar Google Chrome na última versão

## Running

- Execute `docker build -t jse7 .` apenas a primeira vez que for executar o projeto
> Apenas caso preciso usar Docker
- Execute `docker run -it --rm -v "$(pwd)":"/app" -w "/app" -p 3000:3000 jse7 sh` para iniciar e acessar o container
> Apenas caso preciso usar Docker
- Execute `npm ci` para restaurar os pacotes
- Execute `npm start` e em seguida vá para o seu navegador em [http://localhost:3000](http://localhost:3000) para visualizar a página acima

## Checklist Features

- Titles List
  - [x] - Campo para pesquisa não deve travar ao digitar termo de pesquisa
  - [x] - Deve desenhar mãos na tela e fazer com que elementos em segundo plano  continuem sendo clicáveis  🙌
  - [x] - Deve disparar scroll up quando usar a palma das mãos abertas 🖐
  - [x] - Deve disparar scroll down quando usar a palma das mãos fechadas ✊
  - [x] - Deve disparar click no elemento mais próximo quando usar  gesto de pinça 🤏🏻
  - [x] - Ao mover elementos na tela, deve disparar evento **:hover** em elementos em contexto

- Video Player
  - [x] - Deve ser possivel de reproduzir ou pausar videos com o piscar de olhos 😁
  - [x] - Todo processamento de Machine Learning deve ser feito via Web worker

### Desafios

- [] - Aula 01 - Diferenciar piscada de olhos entre olho direito e esquerdo e atualizar log para mostrar qual olho que piscou.
- [] - Aula 02 - Reconhecer gestos de mãos individuais e printar no log
- [] - Aula 03 - A definir
- [] - Aula 04 - A definir

### Créditos ao Layout

- Interface baseada no projeto [Streaming Service](https://codepen.io/Gunnarhawk/pen/vYJEwoM) de [gunnarhawk](https://github.com/Gunnarhawk)
