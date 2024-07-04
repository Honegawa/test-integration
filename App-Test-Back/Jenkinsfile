pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-22.4.0'
    }

    stages {
        stage('Git Checkout') {
            
            steps {
                git branch: 'main', url: 'https://github.com/Honegawa/test-integration.git'
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
