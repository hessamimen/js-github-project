

// const gitApi = 'https://api.github.com/users/';
const gitApi = 'https://api.github.com/search/users?q=';
const input = document.querySelector('#search');
const form = document.getElementById('github-form')
const submit = document.getElementById('submit')
const userList = document.getElementById('user-list') 


    form.addEventListener('submit', (e)=>{
        e.preventDefault();
    let userUrl = `${gitApi}${input.value}`
        fetch(userUrl)
        .then(res => res.json())
        .then(data =>{
           for(let i=0; i< data.items.length; i++){
            //    console.log(data.items[i].login)
            const userItem = document.createElement('li')
            const avatar = document.createElement('img')
            const userRepos = document.createElement('span')
            const userLink = document.createElement('a')
            const user = data.items[i].login
            avatar.style.width = '50px'
            avatar.style.borderRadius = '50%'
            userRepos.innerHTML = 'Public Repositories';
            userLink.href = data.items[i].html_url;
            userLink.style.marginLeft = '20px'
            userLink.style.paddingBottom = '20px'
            userLink.style.color = '#695d5d'
            userLink.style.display = 'inline-block'
            userLink.style.width = '150px'
            userLink.style.height = '30px'
            userLink.target = '_blank'
            userLink.append(user)
            userItem.append(avatar)
            userItem.append(userLink);
            avatar.src =  data.items[i].avatar_url;
            userItem.append(userRepos);
            
            userList.appendChild(userItem)

            userRepos.addEventListener('click', ()=>{
                const repoUrl = data.items[i].repos_url
                const xBtn = document.createElement('button')
                xBtn.innerHTML = 'X'
                fetch(repoUrl)
                .then(res => res.json())
                .then(data => {
                    if(document.getElementById('repoUrl')===null){
                        const repoUl = document.createElement('ul');
                        repoUl.id = 'repoUrl'
                        repoUl.style.display = 'flex'
                        repoUl.style.flexDirection = 'column'
                        repoUl.style.justifyContent = 'center'
                        repoUl.style.alignItems = 'flex-end'
                        repoUl.style.marginBottom = '20px'
                        for(let i=0; i<data.length; i++){
                            // console.log(data[i].html_url)
                            const repoLi = document.createElement('li')
                            const repoLink = document.createElement('a')
                            userItem.appendChild(repoUl)
                            repoUl.appendChild(repoLi)
                            repoUl.appendChild(xBtn)
                            repoLink.innerHTML = `Repository ${i+1}`
                            repoLink.href = data[i].html_url;
                            repoLink.target = '_blank';
                            repoLi.append(repoLink)}
                    xBtn.addEventListener('click', ()=>{
                        repoUl.remove()
                        repoUl.innerHTML= ''
                    })
                        }
                })
            })    
           }       
        }
            )
            
        form.reset();
    })

