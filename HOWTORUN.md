# How to run
Para executar este projeto você precisa somente ter o docker instalado em sua maquina e executar os seguintes comandos em um terminal na raiz do projeto:

- ``` docker-compose up --build ``` (Este comando ira buildar as imagens do docker e executa-las, esta etapa pode demorar alguns instantes, então é só esperar rodar para poder proseguir.)
- ``` docker-compose exec app sh ./install.sh ``` (Este comando é onde será instalado as dependencias do composer na API, então tambem pode demorar alguns instantes.)

Após isso a aplicação estará acessível neste link http://localhost:8080.

Para acessar ao login utilize as sequintes credenciais:

- email: admin@bs2.com.br
- senha: password