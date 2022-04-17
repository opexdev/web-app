pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'demo-web-app'
        DEFAULT_NETWORK_NAME = 'demo-opex'
        API_BASE_URL = 'https://api.opex.dev'
        CLIENT_ID='web-app'
        LOGIN_CLIENT_ID='admin-cli'
        CLIENT_SECRET='08b6c030-857e-4328-a178-d6f17d42848d'
        GENERATE_SOURCEMAP='false'
    }

    stages('Deploy') {
        stage('Build') {
            steps {
                setBuildStatus("?", "PENDING")
                sh 'docker-compose build'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker-compose up -d --remove-orphans'
                sh 'docker image prune -f'
                sh 'docker network prune -f'
            }
        }
    }

    post {
        always {
            echo 'One way or another, I have finished'
        }
        success {
            echo ':)'
            setBuildStatus(":)", "SUCCESS")
        }
        unstable {
            echo ':/'
            setBuildStatus(":/", "UNSTABLE")
        }
        failure {
            echo ':('
            setBuildStatus(":(", "FAILURE")
        }
        changed {
            echo 'Things were different before...'
        }
    }
}

void setBuildStatus(String message, String state) {
    step([
            $class            : "GitHubCommitStatusSetter",
            reposSource       : [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/opexdev/OPEX-Web-APP"],
            contextSource     : [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
            errorHandlers     : [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
            statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
    ])
}
