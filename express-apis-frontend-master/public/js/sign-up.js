const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm)
  const username = formData.get('username')
  const password = formData.get("password")
  const email = formData.get("email")
  const body = {email,password,username}
  let res = await fetch("http://localhost:8080/users/register",{
      method:"POST",
      body:JSON.stringify(body),
      headers:{
          "Content-Type":"application/json"
      }
  })
  console.log(res)
  if(!res.ok){
      throw res
  }
  const {
    token,
    user: { id },
  } = await res.json();

  localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);
  // Sign up logic here
});
