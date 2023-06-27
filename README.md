# Recoóleo - Aplicativo de Reciclagem de Óleo

O Recoóleo é um aplicativo de reciclagem de óleo desenvolvido utilizando Node.js, EJS, Express e PWA (Progressive Web Application). Ele permite aos usuários realizar o cadastro e login, alterar seus dados pessoais e senha, além de gerenciar espaços para a coleta de óleo. Os proprietários dos espaços têm o controle sobre a entrada de novos membros, podendo aprovar solicitações de participação. Além disso, os proprietários podem entrar em contato com os coletores para agendar a retirada do óleo coletado e reiniciar o contador de óleo do espaço. Também é possível remover os espaços criados pelos proprietários.

## Funcionalidades

O Recoóleo oferece as seguintes funcionalidades:

1. **Cadastro e Login de Usuários**: Os usuários podem criar uma conta no aplicativo e fazer login para acessar as funcionalidades disponíveis.
2. **Gerenciamento de Dados Pessoais**: Os usuários têm a capacidade de atualizar suas informações pessoais e alterar a senha de acesso.
3. **Espaços para Coleta de Óleo**: Os proprietários podem criar e gerenciar espaços destinados à coleta de óleo, fornecendo detalhes como localização e capacidade de armazenamento.
4. **Solicitação de Participação**: Os usuários interessados em fazer parte de um espaço de coleta podem solicitar a participação, aguardando a aprovação do proprietário.
5. **Comunicação entre Proprietários e Coletores**: Os proprietários podem entrar em contato com os coletores, através de um link direto para o WhatsApp, quando o contador atinge a capacidade máxima. Assim, podem combinar a retirada do óleo já coletado.
6. **Reinício do Contador de Óleo**: Os proprietários têm a opção de reiniciar o contador de óleo armazenado em seus espaços, indicando que o óleo já foi retirado.
7. **Remoção de Espaços**: Os proprietários podem remover os espaços que criaram, caso necessário.

## Tecnologias Utilizadas

O Recoóleo foi desenvolvido utilizando as seguintes tecnologias:

- Node.js: plataforma de desenvolvimento JavaScript para o lado do servidor.
- EJS: mecanismo de visualização (template engine) para geração de páginas HTML dinâmicas.
- Express: framework web para construção de APIs e manipulação de rotas.
- PWA (Progressive Web Application): tecnologia que permite a instalação e execução do aplicativo como um aplicativo nativo em dispositivos móveis e desktops.

## Instalação

Para executar o aplicativo Recoóleo localmente, siga as instruções abaixo:

1. Clone este repositório: `git clone https://github.com/caioluz/recooleo.git`
2. Navegue até o diretório do projeto: `cd recooleo`
3. Instale as dependências necessárias: `npm install`
4. Inicie o servidor local: `npm start`
5. Inicie o servidor do json-server: `npm run server`
6. Acesse o aplicativo no navegador em `http://localhost:8080`

Certifique-se de ter o Node.js e o npm instalados em sua máquina antes de prosseguir com as etapas acima.

## Aplicação

O projeto já encontra-se hospedado online e pode ser acessado ao clicar: [Recoóleo]().

## Contribuição

Se você deseja contribuir com o aplicativo Recoóleo, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie uma nova branch com a sua contribuição: `git checkout -b minha-contribuicao`
3. Faça as alterações necessárias e commit: `git commit -m "Minha contribuição"`
4. Faça push para o repositório remoto: `git push origin minha-contribuicao`
5. Abra um Pull Request neste repositório.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE.md).

## Contato

Se você tiver alguma dúvida ou sugestão em relação a este projeto, entre em contato conosco pelo email: [recooleo@gmail.com](mailto:recooleo@gmail.com). Agradecemos seu interesse!
