if (typeof browser === "undefined") {
    var browser = chrome;
}

let engines = {
        "google": {
            element_id: "search",
            link: "https://google.com/search?extension=not-amazon&q="
        },
        "ddg": {
            element_id: "links",
            link: "https://duckduckgo.com/?extension=not-amazon&q="
        }
    }

if (window.location.hostname.indexOf('amazon') != -1) {
    let addtoCart = document.getElementById('addToCart_feature_div');
    let buttonHTML = `<div id="addToCart_feature_div" class="celwidget" data-feature-name="goodButton" data-csa-c-id="st6div-1ha3y9-75hfre-luv9bo" data-cel-widget="addToCart_feature_div">
    <div class="a-button-stack">
        <span class="a-declarative" data-action="dp-pre-atc-declarative" data-dp-pre-atc-declarative="{}" id="atc-declarative">
        <span id="not-amazon-button-span" class="a-button a-spacing-small a-button-primary a-button-icon"><span class="a-button-inner"><i class="a-icon a-icon-cart"></i><input id="not-amazon-button" name="submit.add-to-cart" title="Don't Give Jeff Bezos Money" data-hover="Select <b>__dims__</b> from the left<br> to add to Shopping Cart" class="a-button-input" value="Not Amazon" aria-labelledby="submit.add-to-cart-announce"><span id="submit.add-to-cart-announce" class="a-button-text" aria-hidden="true">Don't Give Jeff Bezos Money</span></span></span>
        </span>
        </div>
        <div class="dp-cif aok-hidden" data-feature-details="{&quot;name&quot;:&quot;atc&quot;,&quot;isInteractive&quot;:false}"></div>
        <script type="text/javascript">(function(f) {var _np=(window.P._namespace("DetailPageBuyBoxTemplate"));if(_np.guardFatal){_np.guardFatal(f)(_np);}else{f(_np);}}(function(P) {
        P.now().execute('dp-mark-atc',function(){
        if (typeof window.markFeatureRender === 'function') {
        window.markFeatureRender('atc',{isInteractive:false});
        }
        });
        }));
        </script>
    </div>`
    addtoCart.innerHTML += buttonHTML;
    
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onGot(item) {
        let search_engine = 'ddg'
        if (item.search_engine) {
            search_engine = item.search_engine;
        }
        document.getElementById('not-amazon-button-span').onclick = function () {
            let title = document.getElementById("productTitle").innerHTML;
            // Formats title so that it fits in url
            title = encodeURIComponent(title);
            if (search_engine !== 'ddg') {
                title += '-amazon'
            }
            window.open(engines[search_engine].link + title);
        }

    }
    let getting = browser.storage.sync.get("search_engine", onGot);
    //getting.then(onGot, onError);


} else if (window.location.hostname.indexOf('google') != -1) {
    // Redirect to first google result
    let search = document.getElementById(engines['google'].element_id);
    let link = search.getElementsByTagName('a')[0];
    window.location = link;
} else if (window.location.hostname.indexOf('duckduckgo') != -1) {
    // While link isn't undefined
    setTimeout(function () {
        let search = document.getElementById(engines['ddg'].element_id);
        let link='amazon';
        let count = 0;
        let atags = search.getElementsByTagName('a');
        // While 'amazon' is in the link
        do {
            link = atags[count].href;
            count ++;
        } while (link.indexOf('amazon') !== -1);

        window.location = link;
    }, 1000);
}