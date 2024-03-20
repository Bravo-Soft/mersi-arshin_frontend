pipeline {
    agent any
    
    stages {
        stage('SCM cloning') {
            steps {
                echo 'Server cloning...'
                sshagent(['my_id']) {
                    sh """
                        mkdir -p mersi-arshin-front-test && cd mersi-arshin-front-test && git clone git@github.com:Bravo-Soft/mersi_frontend.git -b dev .
                    """
                }
            }
        }
        stage('Deployment') {
            steps {
                script {
                    def host = 'user@92.255.109.36'
                    withCredentials([usernamePassword(credentialsId: 'kyle_reese_key', usernameVariable: 'user', passwordVariable: 'pass')]) {
                        // stop old containers
                        sh "sshpass -p ${pass} ssh ${host} 'docker compose -f mersi-arshin-front-test/docker-compose.yml down'"

                        // delete a folder with project on remote host
                        sh "sshpass -p ${pass} ssh ${host} 'rm -rf mersi-arshin-front-test'"

                        // transfer projects to remote server
                        sh "sshpass -p ${pass} rsync -avz --quiet --delete mersi-arshin-front-test ${host}:/home/user"
        
                        // run the docker container
                        sh "sshpass -p ${pass} ssh ${host} 'cd mersi-arshin-front-test && docker compose up -d --build'"
                    }
                }
            }
        }
    }
    post {
        always {
          script {
            try {
              // we need to clear a pipeline workspace folder
              sh 'rm -rf ./* .[^.]*'
            } catch (Exception e) {
              echo "Error on pipeline files removes has occured: ${e}"
            }
           }
        }
        // pipeline end status messaging to telegram
        // when success
        success {
          withCredentials([string(credentialsId: 'botSecret', variable: 'TOKEN'), string(credentialsId: 'chatId', variable: 'CHAT_ID')]) {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `SUCCESS`'
                   """)
          }
        }
    
        //when aborted (e.g. by hands (manually))
        aborted {
          withCredentials([string(credentialsId: 'botSecret', variable: 'TOKEN'), string(credentialsId: 'chatId', variable: 'CHAT_ID')]) {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `ABORTED`'
                    """)
          }
        }
    
        // when failure (e.g. errors in pipeline console)
        failure {
          withCredentials([string(credentialsId: 'botSecret', variable: 'TOKEN'), string(credentialsId: 'chatId', variable: 'CHAT_ID')]) {
            sh  ("""
                        curl -s -X POST https://api.telegram.org/bot\${TOKEN}/sendMessage -d chat_id=\${CHAT_ID} -d parse_mode=MarkdownV2 -d text='*Job*: `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n*Build url*: `${env.BUILD_URL}`\n*STATUS*: `FAILURE`'
                    """)
          }
        }
    }
}
