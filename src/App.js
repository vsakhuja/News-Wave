import React, {useState, useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js'

const alanKey='3230ff79b5fee4af3afd4d031d68c09c2e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if (command === 'newHeadlines')
                {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } 
                else if (command === 'highlight')
                {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if (command === 'open')
                {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        // alanBtn().playText('Please try that again');
                    }
                    else if (article)
                    {
                        window.open(article.url, '_blank');
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://akamaividz2.zee5.com/image/upload/w_1082,h_609,c_scale,f_webp,q_auto:eco/resources/0-10-CHN-000501271-20220530150000/list/51D4969784A9C68FA1118C7DD0C1FFFB1B032BF3G2928e48261af461698fe1034384b0359.jpg" className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;

