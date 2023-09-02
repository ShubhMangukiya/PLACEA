import fs from 'fs';
import convert from 'xml-js';
import fetch from 'node-fetch';
import moment from 'moment';

const jsonFilePath = '../json/posts.json';
const hostBlogBaseURL = 'https://www.placea.in';
const untrackedUrlsList = [];
const options = { compact: true, spaces: 4 };

/* 
    Method to Fetch dynamic List of URLs from Rest API/DB 
*/
const fetchBlogsList = async () => {
    try {
        const jsonData = await fs.promises.readFile(jsonFilePath, 'utf8');
        const blogPosts = JSON.parse(jsonData);

        if (blogPosts) {
            blogPosts.forEach(post => {
                const modifiedTitle = post.frontmatter.title.replace(/- /g, '').replace(/ /g, '-').toLowerCase();
                untrackedUrlsList.push(`${hostBlogBaseURL}/${modifiedTitle}`);
            });
            filterUniqueURLs();
        }
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
    }
}
/* 
    Method to Filter/Unique already existing URLs and new urls we fetched from DB
*/
const filterUniqueURLs = () => {
    fs.readFile('sitemap-posts.xml', (err, data) => {
        if (data) {
            const existingSitemapList = JSON.parse(convert.xml2json(data, options));
            let existingSitemapURLStringList = [];
            if (existingSitemapList.urlset && existingSitemapList.urlset.url && existingSitemapList.urlset.url.length) {
                existingSitemapURLStringList = existingSitemapList.urlset.url.map(ele => ele.loc._text);
            }

            untrackedUrlsList.forEach(ele => {
                if (existingSitemapURLStringList.indexOf(ele) == -1) {
                    existingSitemapList.urlset.url.push({
                        loc: {
                            _text: ele,
                        },
                        changefreq: {
                            _text: 'weekly'
                        },
                        priority: {
                            _text: 0.8
                        },
                        lastmod: {
                            _text: moment().format('YYYY-MM-DDThh:mmTZD')
                        }
                    });
                }
            });
            createSitemapFile(existingSitemapList);
        }
    });
}

/* 
    Method to convert JSON format data into XML format
*/
const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options); // to convert json text to xml text
    saveNewSitemap(finalXML);
}

/* 
    Method to Update sitemap.xml file content
*/
const saveNewSitemap = (xmltext) => {
    fs.writeFile('sitemap-posts.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("Post updated in sitemap!");
    });
}

fetchBlogsList();
