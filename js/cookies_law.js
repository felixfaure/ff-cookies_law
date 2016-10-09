
//GA code :
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

//http://stackoverflow.com/questions/10668292/is-there-a-setting-on-google-analytics-to-suppress-use-of-cookies-for-users-who
//http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/outils-et-codes-sources/la-mesure-daudience/

var tagAnalyticsCNIL = {}

tagAnalyticsCNIL.CookieConsent = function() {
  var gaProperty = 'UA-XXXXXX-Y '
  // Désactive le tracking si le cookie d'Opt-out existe déjÃ .
  var disableStr = 'ga-disable-' + gaProperty;
  var firstCall = false;

  // Fonction utile pour récupérer un cookie à partir de son nom
  function getCookie(NameOfCookie)  {
    if (document.cookie.length > 0) {
      begin = document.cookie.indexOf(NameOfCookie+"=");
      if (begin != -1)  {
        begin += NameOfCookie.length+1;
        end = document.cookie.indexOf(";", begin);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(begin, end));
      }
     }
    return null;
  }

  //Cette fonction retourne la date d'expiration du cookie de consentement
  function getCookieExpireDate() {
    // Le nombre de millisecondes que font 13 mois
    var cookieTimeout = 1000 * 3600 * 24 * 30 * 13;
    var date = new Date();
    date.setTime(date.getTime()+cookieTimeout);
    var expires = "; expires="+date.toGMTString();
    return expires;
  }

  //Cette fonction vérifie si on  a déjà  obtenu le consentement de la personne qui visite le site.
  // function checkFirstVisit() {
  //    var consentCookie =  getCookie('hasConsent');
  //    if ( !consentCookie ) return true;
  // }

  //Affiche une  bannière d'information en haut de la page
  function showBanner(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','cookieBanner');
    if (div.classList)
      div.classList.add('cookiebanner');
    else
      div.className += ' ' + 'cookiebanner_close';
    // If inline styles :
    // div.style.width= "100%";
    // div.style.position= "fixed";
    // div.style.bottom= "0";
    // div.style.left= "0";
    // div.style.zIndex = "99999";
    // div.style.backgroundColor = "#d2232a";
    // div.style.padding = ".5em 6em .5em 1em";
    // div.style.color = "#fff";
    // div.style.fontSize = ".75em";
    // div.innerHTML =  'Ce site utilise Google Analytics. En continuant à naviguer, vous nous autorisez à déposer un cookie à des fins de mesure d’audience. <a href="javascript:tagAnalyticsCNIL.CookieConsent.showInform()" style="text-decoration:underline;color:#fff;">En savoir + ou s’opposer</a>.<button style="position:absolute;top:0;right:0;padding:.5em 1em;" id="cookieBanner_close">X<span class="srOnly">Fermer</span></button>';
    // Le code HTML de la demande de consentement
    div.innerHTML =  'Ce site utilise des cookies pour mesurer son audience. <a href="javascript:tagAnalyticsCNIL.CookieConsent.showInform()">En savoir + ou s’opposer</a>.<button class="cookiebanner_close" id="cookieBanner_close"><span class="icon-close"></span><span class="srOnly">Fermer</span></button>';
    // Ajoute la bannière à la fin de la page
    bodytag.appendChild(div);
    createInformAndAskDiv();
  }

  //La fonction qui informe et demande le consentement.
  function createInformAndAskDiv() {
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','informAndAsk');
    if (div.classList)
      div.classList.add('cookiebanner_modale');
    else
      div.className += ' ' + 'cookiebanner_modale';
    // If inline styles :
    // div.style.width = "30em";
    // div.style.maxWidth = "90%";
    // div.style.backgroundColor = "#E5E5E5";
    // div.style.padding = "1em";
    // div.style.display = "none";
    // div.style.position = "fixed";
    // div.style.top = "8em";
    // div.style.boxShadow = "0px 0.125em 0.3125em rgba(0, 0, 0, 0.5)";
    // div.style.left = "50%";
    // div.style.marginLeft = "-15em";
    // div.style.zIndex = "100000";
    // div.style.opacity = "1";
    // div.style.border = "1px solid #d2232a";
    // Le code HTML de la demande de consentement
    // div.innerHTML =  '<h2 style="text-align:center;">Les cookies Google Analytics</h2>\
    // <p>Ce site utilise des cookies de Google Analytics, ils nous aident à  identifier le contenu qui vous interesse le plus ainsi qu’à  repérer certains dysfonctionnements. Vos données de navigations sur ce site sont envoyées à  Google Inc.</p>\
    // <p style="text-align:center;"><button style="margin-right:3em;text-decoration:underline;" name="S’opposer" onclick="tagAnalyticsCNIL.CookieConsent.gaOptout();" id="optout-button" >S’opposer</button> \
    // <button style="text-decoration:underline;" name="cancel" id="consent-button">Accepter</button></p>';
    div.innerHTML =  '<h2 class="t2 t2-s2">Les cookies Google Analytics</h2>\
    <p>Ce site utilise des cookies de Google Analytics.<br>Ils nous aident à  identifier le contenu qui vous interesse le plus ainsi qu’à  repérer certains dysfonctionnements. Vos données de navigations sur ce site sont envoyées à  Google Inc.</p>\
    <p><button class="btn btn-inline" name="S’opposer" onclick="tagAnalyticsCNIL.CookieConsent.gaOptout();" id="optout-button" >S’opposer</button> \
    <button class="btn btn-inline" name="cancel" id="consent-button">Accepter</button></p>';
    // Ajoute la bannière à la fin de la page
    bodytag.appendChild(div);
  }

  // Fonction d'effacement des cookies
  function delCookie(name)   {
    var path = ";path=" + "/";
    var hostname = document.location.hostname;
    if (hostname.indexOf("www.") === 0)
        hostname = hostname.substring(4);
    var domain = ";domain=" + "."+hostname;
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
  }

  // Efface tous les types de cookies utilisés par Google Analytics
  function deleteAnalyticsCookies() {
    var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]
    for (var i=0; i<cookieNames.length; i++)
      delCookie(cookieNames[i])
  }

  function isClickOnOptOut(evt) {
    var target = evt.target;
    // Si le noeud parent ou le noeud parent du parent est la bannière, on ignore le clic
    return (target && target.id != 'consent-button' && target.id != 'cookieBanner_close' && (target.id == 'cookieBanner' || target.parentNode.id == 'cookieBanner' || target.parentNode.parentNode.id == 'cookieBanner' || target.id == 'optout-button' || target.id == 'informAndAsk' || target.parentNode.id == 'informAndAsk' || target.parentNode.parentNode.id == 'informAndAsk'));
  }

  function consent(evt) {
    // On vérifie qu'il ne s'agit pas d'un clic sur la bannière
    if ( typeof evt === 'undefined' || !isClickOnOptOut(evt) ) {
      if ( !clickprocessed ) {
        if(typeof evt === 'undefined') evt.preventDefault();
        document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';
        //On appelle google analytics
        callGoogleAnalytics();
        clickprocessed = true;
        //on vire les écouteurs
        document.removeEventListener("click", consent, false);
        //On vire la barre du bas et la modale
        tagAnalyticsCNIL.CookieConsent.hideInform();
        //Si clic sur un lien on y va quand meme au bout d'1s
        if(typeof evt === 'undefined') window.setTimeout(function() {evt.target.click();}, 1000);
      }
    }
  }

  // Tag Google Analytics
  function callGoogleAnalytics() {
    if (firstCall) return;
    else firstCall = true;
    // Old GA code :
    // _gaq.push(['_setAccount', gaProperty]);
    // _gaq.push(['_trackPageview']);
    // New GA code :
    ga('create', gaProperty, 'auto');
    ga('send', 'pageview');
  }

  return {
    // La fonction d'opt-out
    gaOptout: function() {
      document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';
      document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
      window[disableStr] = true;
      clickprocessed = true;
      tagAnalyticsCNIL.CookieConsent.hideInform();
      deleteAnalyticsCookies();
      //on appelle google analytics la variable window[disableStr] bloquera ou non
      callGoogleAnalytics();
    },

    showInform: function() {
      var div = document.getElementById("informAndAsk");
      if ( div != null ) div.style.display = "block";
    },

    hideInform: function() {
      var div = document.getElementById("informAndAsk");
      if ( div != null ) {
        div.style.display = "none";
        div.parentNode.removeChild(div);
      }
      var div = document.getElementById("cookieBanner");
      if ( div != null ) {
        div.style.display = "none";
        div.parentNode.removeChild(div);
      }
    },

    start: function() {
      //Vérifier que le consentement n'a pas déjà  été obtenu avant d'afficher la bannière
      var consentCookie =  getCookie('hasConsent');
      clickprocessed = false;
      if (!consentCookie) {
        showBanner();
        //L'utilisateur n'a pas encore de cookie, on affiche la bannière.
        //Si il clique sur un autre élément que la bannière on enregistre le consentement
        document.addEventListener("click", consent, false);
      } else {
        if (document.cookie.indexOf('hasConsent=false') > -1) window[disableStr] = true;
        //on appelle google analytics la variable window[disableStr] bloquera ou non
        callGoogleAnalytics();
      }
    }
  }
}();

tagAnalyticsCNIL.CookieConsent.start();
