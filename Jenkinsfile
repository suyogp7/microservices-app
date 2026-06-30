pipeline {
    agent any

    environment {
        // Defines your global repository target registry namespace
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
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Build Orders Service') {
            steps {
                sh 'docker build -t $REGISTRY/orders-service:1.1 ./orders'
            }
        }

        stage('Build Payments Service') {
            steps {
                sh 'docker build -t $REGISTRY/payments-service:1.1 ./payments'
            }
        }

        stage('Build Frontend Service') {
            steps {
                sh 'docker build -t $REGISTRY/frontend-service:1.1 ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                    docker push $REGISTRY/orders-service:1.1
                    docker push $REGISTRY/payments-service:1.1
                    docker push $REGISTRY/frontend-service:1.1
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/ --validate=false'
            }
        }

        stage('Verify Services Health') {
            steps {
                script {
                    echo 'Waiting 15 seconds for Kubernetes Pod rollouts to settle...'
                    sleep 15

                    // 1. Print current cluster pods to the console logs
                    sh 'kubectl get pods'

                    // 2. Internal ping from Frontend pod to Orders Service
                    echo 'Testing Orders API internal routing...'
                    sh 'kubectl exec deployment/frontend-deployment -- wget -qO- http://orders-service:3000/orders'

                    // 3. Internal ping from Frontend pod to Payments Service
                    echo 'Testing Payments API internal routing...'
                    sh 'kubectl exec deployment/frontend-deployment -- wget -qO- http://payments-service:3001/payments'
                }
            }
        }
    }
}
