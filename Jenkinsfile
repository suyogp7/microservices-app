pipeline {
    agent any

    environment {
        REGISTRY = "docker.io/suyog2306"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suyogp7/microservices-app.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        mkdir -p /tmp/.docker
                        echo '{"auths":{}}' > /tmp/.docker/config.json
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin --config /tmp/.docker
                    '''
                }
            }
        }

        stage('Build Orders Service') {
            steps {
                sh 'docker build -t $REGISTRY/orders-service:1.0 ./orders'
            }
        }

        stage('Build Payments Service') {
            steps {
                sh 'docker build -t $REGISTRY/payments-service:1.0 ./payments'
            }
        }

        stage('Build Frontend Service') {
            steps {
                sh 'docker build -t $REGISTRY/frontend-service:1.0 ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $REGISTRY/orders-service:1.0'
                sh 'docker push $REGISTRY/payments-service:1.0'
                sh 'docker push $REGISTRY/frontend-service:1.0'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
