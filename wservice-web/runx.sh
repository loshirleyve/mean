DEBUG=y9* forever -l forever.log -o out.log -e error.log --append start index.js
tail -f ~/.forever/forever.log 

