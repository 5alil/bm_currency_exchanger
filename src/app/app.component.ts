import { Component, resolveForwardRef } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'bm_currency_exchanger';

  amount=1;
  from_currency='EGP';
  to_currency='USD';
  switcher_flag='';

  exchange_result=0;

  res_1='' ;
  res_2='';

  show_loading=false;

  reset_results(){
    this.res_1='';
    this.res_2='';
  }
  switch_currency(){
    this.switcher_flag=this.from_currency;
    this.from_currency=this.to_currency;
    this.to_currency=this.switcher_flag;
    this.switcher_flag='';
    this.reset_results();
  }

  convert_currency(){
    this.show_loading=true;

    if(!this.amount)
      this.amount=1;
      
    var myHeaders = new Headers();
    myHeaders.append("apikey", "gG37lSvL9kHdAYJqCALkg5CFHaaP9yP1");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    
    fetch("https://api.apilayer.com/fixer/convert?to="+this.to_currency+"&from="+this.from_currency+"&amount="+this.amount, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.exchange_result=result['result'];
        this.res_1=this.amount + ' '+this.from_currency+' = '+this.exchange_result+' '+this.to_currency;
        this.res_2=this.exchange_result+ ' '+this.to_currency;
        this.show_loading=false;
      })
      .catch(error => {
        this.show_loading=false;
        alert(error);
      });
  }
}



