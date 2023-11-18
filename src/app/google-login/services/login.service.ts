import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, PhoneAuthProvider, RecaptchaVerifier, Auth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }

  // ---- login method -------
  login(email: string, password: string){
    this.angularFireAuth.signInWithEmailAndPassword(email,password)
    .then((currentUser)=>{

      const uid = currentUser.user?.uid ? currentUser.user?.uid : '';

      localStorage.setItem('token',uid);
      console.log('user email : '+ currentUser.user?.email, 'user uid : '+ uid);
      
      if(currentUser.user?.emailVerified === true){
        this.router.navigate(['/login/dashboard']);
      }else{
        this.router.navigate(['/login/verify-email']);
      }



    }, err => {
      alert('Authentication : Something went rong');
      this.router.navigate(['/login']);
    })
  }


  // ---- register method -------
  register(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {

        console.log('user email : '+ currentUser.user?.email, 'user uid : '+ currentUser.user?.uid);

        alert('Registration successfull')
        
        this.router.navigate(['/login']);

        this.sendEmailForVerification(currentUser.user);

      }, err => {
        alert(err.message);
        this.router.navigate(['/login/register']);
      })
  }


  // ---- sign out method -------
  logout() {
    this.angularFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
      })
  }



  // ----- sign in with Google --------
  singnInWithGoogle(){
    return this.angularFireAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this.router.navigate(['/login/dashboard']);
    }, err => {
      alert(err.message);
    });
  }


  // ------ forgot password -----------
  forgotPassword(email: string){
    this.angularFireAuth.sendPasswordResetEmail(email).then((res) => {
      this.router.navigate(['/login/verify-email']);
    }, err => {
      alert('Something wrong happend');
    });
  }


  // ------ send Email For Verification -----------
  sendEmailForVerification(user: any) { 
    this.sendEmailForVerification(user);
    user.sendEmailVerification().then(
      (res: any) => { this.router.navigate(['/login/verify-email']); },
      (err: any) => { alert('Something went wrong. Not able to sent email to your registred email'); }
    );
  }





//     // ----- singn In With Phone Number --------
//   async singnInWithPhoneNumber(phoneNumber: string) {


//     // 'recaptcha-container' is the ID of an element in the DOM.
// const applicationVerifier1 = new RecaptchaVerifier(Auth,'recaptcha-container');
// const provider = new PhoneAuthProvider(this.angularFireAuth);
// const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier1);
// // Obtain the verificationCode from the user.
// const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
// const userCredential = await signInWithCredential(auth, phoneCredential);




//     // 'recaptcha-container' is the ID of an element in the DOM.
//     const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
//     return await this.angularFireAuth.signInWithPhoneNumber(phoneNumber, applicationVerifier)
//       .then(function (confirmationResult) {
//         let verificationCode = window.prompt('Please enter the verification ' +
//           'code that was sent to your mobile device.');
//           verificationCode = verificationCode ? verificationCode : '';
//         return confirmationResult.confirm(verificationCode);
//       })
//       .catch(function (error) {
//         // Handle Errors here.
//       });

//   }







}


