(this.webpackJsonpjoshmk=this.webpackJsonpjoshmk||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),l=a(12),o=a.n(l),r=(a(92),a(60)),s=a(118),c=a(119),u=a(120),d=a(125),m=a(121),h=a(55),p=a.n(h),b=a(123),g=a(114),f=a(115),w=a(73),k=a(122),y=a(117),v=a(28),E=a.n(v),x=a(65),S=a.n(x),L=a(66),T=a.n(L),M=a(67),C=a.n(M),j=a(68),F=a.n(j),N=a(33),J=a.n(N),I=a(69),R=a.n(I),O=function(e){var t=e.item,a=e.bottomMargin,n=t.title,l=t.subtitle,o=t.subtitleLink,r=t.tags,s=t.description,c=t.link,u=t.img,d=t.footer,m=t.width,h=t.location,p=t.badge,v=t.badgeText,x=t.badgeVariant,S=t.people;return i.a.createElement(b.a,{className:"".concat(a," ").concat(m)},u&&i.a.createElement(b.a.Img,{variant:"top",src:P[u]}),i.a.createElement(b.a.Body,null,i.a.createElement(b.a.Title,null,c?i.a.createElement("a",{href:c,target:"_blank"},n):n,p&&i.a.createElement(g.a,{variant:x,className:"ml-2"},v)),i.a.createElement(b.a.Subtitle,{className:"text-muted mb-2"},o?i.a.createElement("a",{href:o||"",target:"_blank"},l):l," ",h&&"- ".concat(h)),s&&i.a.createElement(b.a.Text,{className:"".concat(r&&r.length>0?"mb-2":"")},s),r&&r.length>0&&i.a.createElement(b.a.Text,null,r.map((function(e,t){return i.a.createElement(g.a,{pill:!0,variant:"secondary",className:"mr-2",key:t},e)})))),S&&i.a.createElement(f.a,{className:"list-group-flush"},i.a.createElement(w.a,null,S.map((function(e,t){var a=e.name,n=e.quote;return i.a.createElement(k.a,{key:t,placement:"top",overlay:i.a.createElement(y.a,{id:"tooltip-".concat(t)},n,i.a.createElement("br",null),"-",a)},i.a.createElement("img",{src:E.a,width:"40px",alt:"Co-worker_image",height:"40px",style:{borderRadius:"20px"},className:"mr-2"}))})))),i.a.createElement(b.a.Footer,null,i.a.createElement("small",{className:"text-muted"},d)))},P=[E.a,S.a,J.a,T.a,C.a,F.a,R.a];var A=function(e){return e.content.map((function(e,t){return i.a.createElement(O,{item:e,bottomMargin:"mb-4",key:t})}))};var V=a(124),D=a(59),B=a(51),_=a(31),K=a(81),z=(a(53),a(54),a(79)),G=a.n(z),H=a(80),W=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(V.a,{variant:"warning"},"Click"," ",i.a.createElement(V.a.Link,{href:G.a,download:"Josh_Knapp_Resume"},"here")," ","for Josh's resume."),i.a.createElement(D.VerticalTimeline,{animate:!1,layout:"1-column"},H.map((function(e,t){return i.a.createElement(D.VerticalTimelineElement,{contentStyle:{padding:"0px"},contentArrowStyle:{borderRight:"7px solid  rgb(33, 150, 243)"},iconStyle:{background:"white",color:"white"},icon:q[e.icon],key:t},i.a.createElement(O,{item:e,bottomMargin:""}))}))))},q=[i.a.createElement(B.c,{color:"#61dafb",size:"50px"}),i.a.createElement(_.c,{color:"#f7df1f",size:"50px"}),i.a.createElement(B.b,{color:"#fba15e",size:"50px"}),i.a.createElement(_.b,{color:"#2d5aff",size:"50px"}),i.a.createElement(_.a,{color:"#721c24",size:"50px"}),i.a.createElement(K.a,{color:"#000000",size:"50px"}),i.a.createElement(_.d,{color:"#e32525",size:"50px"}),i.a.createElement(B.a,{color:"#de56bbba",size:"50px"})];var U=a(23),Y=a(85),$=function(e){var t=e.show,a=e.activePage,n=e.setActivePage;return i.a.createElement(U.a,{in:t},i.a.createElement(Y.a,{activeKey:a,onSelect:n,className:"sticky mr-3",style:{top:"65px",display:"block"}},i.a.createElement("img",{src:J.a,width:"57",height:"87",alt:"Logo",className:"mb-3 mr-3"}),i.a.createElement(Y.a.Item,{className:"d-block"},i.a.createElement(Y.a.Link,{eventKey:"work"},"work")),i.a.createElement(Y.a.Item,{className:"d-block"},i.a.createElement(Y.a.Link,{eventKey:"projects"},"projects")),i.a.createElement(Y.a.Item,{className:"d-block"},i.a.createElement(Y.a.Link,{eventKey:"stories"},"stories"))))};var Q=a(82),X=a(83),Z=(a(108),function(){var e=Object(n.useState)("work"),t=Object(r.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(!1),h=Object(r.a)(o,2),b=h[0],g=h[1];return i.a.createElement("div",{className:"App"},i.a.createElement(s.a,null,i.a.createElement(c.a,null,i.a.createElement(u.a,{className:"text-right"},!b&&i.a.createElement("img",{src:E.a,width:"100",height:"100",alt:"Profile_picture",style:{border:"3px solid black"},className:"mt-5 box align-top rounded-circle"}),i.a.createElement($,{show:b,activePage:a,setActivePage:l})),i.a.createElement(u.a,{xs:7},i.a.createElement("h1",{className:"display-2 mt-5"},"Josh Knapp"),i.a.createElement(p.a,{onChange:function(e){g(!e)},partialVisibility:!0},i.a.createElement(d.a,{id:"controlled-tab-example",activeKey:a,onSelect:l,className:"border-0"},i.a.createElement(m.a,{eventKey:"work",title:"work",className:"pt-4 border-0 mb-4"},i.a.createElement(W,null)),i.a.createElement(m.a,{eventKey:"projects",title:"projects",className:"pt-4 border-0"},i.a.createElement(A,{content:Q,width:"w-50",type:"projects"})),i.a.createElement(m.a,{eventKey:"stories",title:"stories",className:"pt-4 border-0"},i.a.createElement(A,{content:X,width:"",type:"stories"}))))),i.a.createElement(u.a,null))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},28:function(e,t,a){e.exports=a.p+"static/media/ProfilePic.a2c76f61.jpg"},33:function(e,t,a){e.exports=a.p+"static/media/josh_logo_5.a54df82b.png"},54:function(e,t,a){},65:function(e,t,a){e.exports=a.p+"static/media/inventionofsound.b17c831e.jpeg"},66:function(e,t,a){e.exports=a.p+"static/media/libby_van.5d40c4b7.jpeg"},67:function(e,t,a){e.exports=a.p+"static/media/van_death.705c409f.jpeg"},68:function(e,t,a){e.exports=a.p+"static/media/tumps_assistant.e86fe596.jpeg"},69:function(e,t,a){e.exports=a.p+"static/media/train.f722cce2.png"},79:function(e,t,a){e.exports=a.p+"static/media/resume.61d05946.pdf"},80:function(e){e.exports=JSON.parse('[{"subtitle":"ASML","subtitleLink":"https://www.asml.com/en","title":"Software Engineer","location":"Hillsboro, OR","description":"Part of an exciting internal software development team delivering a tool for deployment and maintenance of next generation semiconductor lithography machines.","footer":"November 2018 - Present","icon":0,"badge":false,"badgeVariant":null,"badgeText":null,"people":[{"name":"Bob","quote":"Go josh!"},{"name":"Steve","quote":"Yeah!"},{"name":"Riah","quote":"He\'s sexy"}],"tags":["ReactJS","Redux","Bootstrap","Python"],"width":null},{"subtitle":"ASML","subtitleLink":"https://www.asml.com/en","title":"Software Engineer & Data Analyst","location":"Hillsboro, OR","description":"Successfully developed an MVP for maintenance planning software, highlighting a need for internal operations tracking software and kicking off 3 internal software development teams.","footer":"March 2017 - November 2018","icon":1,"badge":true,"badgeVariant":"secondary","badgeText":"Contract","people":null,"tags":["HTML","CSS","JavaScript","Bootstrap"],"width":null},{"subtitle":"Edge Development","subtitleLink":"https://edgedevelopment.net/","title":"Assistant to Superintendents","location":"Portland, OR","description":"Represented Contractors and Superintendents on job sites when they were at other sites.","footer":"December 2016 - March 2017","icon":2,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":[],"width":null},{"subtitle":"Marble Technologies","subtitleLink":null,"title":"Co-Founder & Creative Director","location":"Portland, OR","description":"Grew a profitable website client base from an untapped Portland market","footer":"December 2016 - March 2017","icon":3,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":["Leadership"],"width":null},{"subtitle":"TriMike Creations","subtitleLink":"https://www.trimike.com/","title":"Mechanical Engineering Intern","location":"Albany, OR","description":"Participated in delivering products of all shapes and sizes for over 30 contract jobs. Client base included Boeing, Allann Brothers, etc.","footer":"June 2014 - September 2014","icon":4,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":["SolidWorks","3D Modeling"],"width":null},{"subtitle":"OSU Robotics & Human Control Systems Lab","subtitleLink":"http://research.engr.oregonstate.edu/rhcs/home","title":"Research Assistant","location":"Corvallis, OR","description":"Research into autonomous grasping of abstract objects.","footer":"July 2013 - April 2014","icon":5,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":["Python"],"width":null},{"subtitle":"Eigen Medical","subtitleLink":"https://www.eigen.com/homepage.shtml?playDEMO=yes","title":"Mechanical Engineering Intern","location":"Grass Valley, CA","description":"Two summers of internship during high school where I assembled Eigen\'s core products and first learned how to 3D design products and have them manufactured.","footer":"June 2010 - September 2010 & June 2011 - September 2011","icon":6,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":["SolidWorks","3D Modeling"],"width":null},{"subtitle":"Life","subtitleLink":null,"title":"Birth & Survival","location":"Earth, The Milky Way","description":"Where the hell am I?","footer":"February 3, 1993 - July 2013","icon":7,"badge":false,"badgeVariant":null,"badgeText":null,"people":null,"tags":[],"width":null}]')},82:function(e){e.exports=JSON.parse('[{"title":"Storyline","subtitle":"Story building tool","subtitleLink":null,"link":"https://github.com/jknapp25/storyline","tags":["ReactJS","vis","react-boostrap"],"description":null,"img":null,"footer":"Last updated Feb 12","width":"w-50"},{"title":"Scrumy","subtitle":"Personal SCRUM tool","subtitleLink":null,"link":"https://github.com/jknapp25/scrumy","tags":["ReactJS","react-boostrap"],"description":null,"img":null,"footer":"Last updated Feb 12","width":"w-50"},{"title":"Joshmk.com","subtitle":"This site","subtitleLink":null,"link":null,"tags":["ReactJS","react-boostrap"],"description":null,"img":null,"footer":"Last updated Feb 12","width":"w-50"},{"title":"Personal Site 1","subtitle":"The first website I built","subtitleLink":null,"link":null,"tags":["HTML","CSS","JavaScript"],"description":null,"img":null,"footer":"Last updated Feb 12","width":"w-50"}]')},83:function(e){e.exports=JSON.parse('[{"title":"The Clicket","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Millipede like light bug. 1.5ft long at maturity. By repeating a specific sequence of clicking sounds, the clicket will illuminate for up to an hour depending on maturity. If wrapped around a limb of a host, the clicket can survive as an indefinite source of powerful light on a very small amount of host blood. Despite modern battery and bulb technology being very good, the clicket is still unrivaled in terms of efficiency.","img":null,"footer":"Dec 4, 2019","width":""},{"title":"The Sham","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Small bird, no more than two inches tall. Swarms together to build elaborate nests extremely quickly. Thousands of years ago it developed a method for camouflaging it\u2019s nests by replicating objects and patterns in the nests surroundings. For example, if there was lots of fallen trees in a wooded area, it may choose to build a nest out of sticks, rocks and mud that looks like a fallen tree. Today, this translates into suburban homedwellers going to bed at night and waking up to a replica of their home next door made of sticks, rocks and mud. Or if you\u2019ve ever noticed a row of mailboxes and one mailbox without a house, that is often the artwork of the Sham.","img":null,"footer":"Mar 31, 2020","width":""},{"title":"Prevent unnecessary re-render\u2019s in React components","subtitle":"The useEffect dependency array","subtitleLink":null,"link":"https://medium.com/@joshknapp/prevent-unnecessary-re-renders-in-react-components-7130b966dad3","tags":["ReactJS","software"],"description":null,"img":null,"footer":"Feb 13, 2020","width":""},{"title":"The Fwelsh","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Peacock like bird. Unable to fly long distances. Translucent red/orangish feathers. When it sits, it becomes a small fire which can be very useful for camp-outs, but If not tended to, the fire will grow indefinitely and destroy anything in its path. The only way to stop the fire is to ignore it, then the bird will return to its original form and walk away.","img":null,"footer":"Nov 13, 2019","width":""},{"title":"My Dream Home (on wheels)","subtitle":"A wish-list of features\u2026","subtitleLink":null,"link":"https://medium.com/@joshknapp/my-dream-home-on-wheels-bb59304fd686","tags":["VanLife"],"description":null,"img":3,"footer":"Jan 26, 2020","width":""},{"title":"The Snug","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Furry, fleshy, ball. No eyes, ears, or limbs. It feeds off of warmth. Makes a sort of subtle purring noise. Theoretically may never die unless it kills itself or another creature eats it. But it will continue to grow rapidly. Very delicious. Humans have continually tried to make them house pets but often fail due to the animals stupidity. It will tend to roll into the fireplace, onto a burning stove, into a hot bath, etc. they will congregate in large packs and lie like a pile of rocks, feeding off of each other\u2019s warmth and the source of warmth they are on. Yellow snugs are extremely rare.","img":null,"footer":"Nov 12, 2019","width":""},{"title":"The Ballon","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Large, flat, oval shaped beetle. 3ft in diameter at maturity. Lives on the bottom of rivers. Commonly mistaken for rocks or boulders. It\'s exoskeleton is stronger than steel. During ancient war times distilled anise was often poured into the shallows of a river, and the ballon would congregate in that area. When picked up, soldiers would place the ballon on their forearm and it\u2019s legs would latch on to the host. Creating an extremely effective battle shield.","img":null,"footer":"Oct 22, 2019","width":""},{"title":"All women are worth protecting","subtitle":"Your ex-girlfriend, your barista, your mom, your friends friend, your mother-in-law, your step-sister, every one of them.","subtitleLink":null,"link":"https://medium.com/the-magnificent-kingdom/all-women-are-worth-protecting-646a5a461896","tags":["Life","Women"],"description":null,"img":null,"footer":"Dec 27, 2018","width":""},{"title":"I\u2019m now Trump\u2019s OFFICIAL personal assistant!","subtitle":null,"subtitleLink":null,"link":"https://medium.com/@joshknapp/im-now-trump-s-official-personal-assistant-a824b538681d","tags":["Fiction","Short Story","Politics"],"description":"Through a family friend, a young woman receives the honored role as Trump\'s personal assistant. Or so she thinks.","img":5,"footer":"Jun 19, 2018","width":""},{"title":"Looth","subtitle":"Creature Field Guide","subtitleLink":null,"link":null,"tags":["Fiction","Mythical Creatures"],"description":"Extremely skinny, needle-like fish. Super sharp nose. Approximately 8-10in at maturity. Lies on the sea floor in shallow water with many others. In small bursts, it swims fast enough to swim straight through the body of other fish and even humans. Can be deadly in large swarms. It\u2019s treated carcass is often wound together to create sturdy baskets.","img":null,"footer":"Oct 22, 2019","width":""},{"title":"The Train Station at the Center of the Earth","subtitle":"I wonder what\u2019s there\u2026","subtitleLink":null,"link":"https://medium.com/the-magnificent-kingdom/the-train-station-at-the-center-of-the-earth-58efaddbb0d","tags":["Fiction"],"description":null,"img":6,"footer":"Jul 27, 2018","width":""},{"title":"The Invention of Sound","subtitle":null,"subtitleLink":null,"link":"https://medium.com/the-magnificent-kingdom/the-invention-of-sound-34d36210c4a7","tags":["Fiction","Short Story"],"description":"An old instrument builder living on the edge of a dense forest receives a letter from an unknown source, kicking off an adventure the world has always been waiting for.","img":1,"footer":"May 23, 2018","width":""},{"title":"Beware of Falling Objects","subtitle":"How it feels having your home-on-wheels deleted by a tree","subtitleLink":null,"link":"https://medium.com/@joshknapp/beware-of-falling-objects-ff1995423d9a","tags":["Life"],"description":null,"img":4,"footer":"May 5, 2018","width":""}]')},87:function(e,t,a){e.exports=a(109)},92:function(e,t,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.dcca037a.chunk.js.map