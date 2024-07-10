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
        
        stage('Install Dependencies') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm install'    
                }
            }
        }
        
        stage('Run Tests') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm test'    
                }
            }
        }
    }
}
