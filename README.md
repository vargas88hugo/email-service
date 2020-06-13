[![Build Status](https://travis-ci.com/vargas88hugo/email-service.svg?branch=master)](https://travis-ci.com/vargas88hugo/email-service)
# Email Service

Email Service is an application that guarantees the sending of messages with SendGrid and SparkPost. It was started by a challenge and there are a lot of missing things. So, don't hesitate to give me any advice, recomendation or collaboration.

## Contents
- [Arquitecture](#Arquitecture)
- [Folder Structure](#Folder)
- [Testing](#Testing)
- [Instalation](#Instalation)
- [Usage](#Usage)
- [TODO](#TODO)

<a name="Arquitecture"></a>
## Arquitecture
The architecture used in this project is based CI / CD with Jest, Travis CI, AWS CodeDeploy, AWS S3, and AWS EC2. The great challange was the deployment and was finally achieved. In terms of software architecture all the program is divided in modules with their controllers, services, repositories and entities. The repositories are decoupled from the controllers and all the business logic is concentrated in the services.

<a name="Folder"></a>
## Folder Structure
```
├── appspec.yml
├── docker-compose.dev.yml
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.dev
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   ├── clear.sh
│   ├── deploy.sh
│   ├── env.sh
│   ├── init.sh
│   ├── script.sh
│   └── test.sh
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── decorators
│   │   │   └── get-user.decorator.ts
│   │   ├── dto
│   │   │   ├── auth-credentials.dto.ts
│   │   │   ├── jwt-payload.interface.ts
│   │   │   └── signin-credentials.dto.ts
│   │   ├── jwt.strategy.ts
│   │   ├── tests
│   │   │   └── auth.spec.ts
│   │   ├── user.entity.ts
│   │   └── user.repository.ts
│   ├── config
│   │   ├── typeorm.configtest.ts
│   │   └── typeorm.config.ts
│   ├── mail
│   │   ├── dto
│   │   │   └── send-email.dto.ts
│   │   ├── mail.controller.ts
│   │   ├── mail.entity.ts
│   │   ├── mail.module.ts
│   │   ├── mail.repository.ts
│   │   ├── mail.service.ts
│   │   └── tests
│   │       └── mail.spec.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json

13 directories, 54 files

```
<a name="Testing"></a>
## Testing
The testing was hard because mock email services are a little tricky and more in NestJS because everything is based on dependency injection. The coverage is green and it has a 89.4% statement but my goal is to paint all with 100%.
<img align="center" src="http://i.imgur.com/62kHPWl.png" />

<a name="Instalation"></a>
## Instalation
There are two ways of installation. In Production on port 80 or Development on port 3000. In the root directory of repository:
### Production
```
$ docker-compose build
$ docker-compose up -d
$ docker-compose exec db psql -U postgres -d postgres -c "ALTER USER $user WITH PASSWORD '$password';"
$ docker-compose exec db psql -U postgres -c "CREATE DATABASE emailservice;"
$ docker-compose exec db psql -U postgres -c "CREATE DATABASE test;"
```
### Development
```
$ docker-compose -f docker-compose.dev.yml up -d
$ docker-compose -f docker-compose.dev.yml exec db psql -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD 'password';"
$ docker-compose -f docker-compose.dev.yml exec db psql -U postgres -c "CREATE DATABASE emailservice;"
$ docker-compose -f docker-compose.dev.yml exec db psql -U postgres -c "CREATE DATABASE test;"
$ docker-compose -f docker-compose.dev.yml exec nest sh -c "npm run test"

```

<a name="Usage"></a>
## Usage
This application has integrated Swagger with documentation, Adminer which is a database manegement and some useful scripts in its folder. Swagger can be used with JWT Bearer Authentication for testing purposes because some routes are private. The token must be obtained from the SignIn response and inserted in the Authorize Panel at the top right of the GUI.
## Otros Endpoints
| URL | Service |
|-----|---------|
| http://localhost:8080 | Adminer database manegement |
| http://localhost:3000 | Email Service in Development |
| http://localhost:80 | Email Service in Production |
| http://localhost:ENV/api | Swagger documentation |

<a name="TODO"></a>
## TODO
* Reach 100% of coverage on tests.
* Integrate more services and routes.
* Improve software architecture like hexagonal.
