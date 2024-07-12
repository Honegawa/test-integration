pipeline {
    agent any
    
    parameters {
        stashedFile '.env'
    }

    tools {
        nodejs 'NodeJS-22.4.0'
    }

    stages {
        stage('Import .env') {
           steps {
                dir('./App-Test-Back') {
                    unstash '.env'
                }
            }
        }   
        
        stage('Install Dependencies Back') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm install'    
                }
            }
        }
        
        stage('Run Tests Back') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm test'    
                }
            }
        }

        stage('Install Dependencies Front') {
            
            steps {
                dir('./App-Test-Front') {
                    bat 'npm install'    
                }
            }
        }
    }
}
