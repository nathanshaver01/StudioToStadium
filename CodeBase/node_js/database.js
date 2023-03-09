const { Client } = require('pg');

const client = new Client({
	host: "mahmud.db.elephantsql.com",
	port: 5432,
	user: "hidjkctp",
	password: "a-1VzII_pxhCj07Ho7tt4mrvb8EkNrAC", //change password!
	database: "hidjkctp"
})

client.connect();
//need to change pk to add new row
client.query('INSERT INTO users VALUES (2, \'a@gmail.com\', \'joe\', \'mama\', 0987654321, false, \'swordfish\', DATE \'2024-05-24\', false)', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})

client.query('Select * from users', (err, res)=>{
	if(!err){
		console.log(res.rows);
	}
	else {
		console.log(err.message);
	}
})


//need to encrypt passwords somehow?
//INSERT INTO users VALUES (2, "a@gmail.com", "joe", "mama", 0987654321, false, "swordfish", 4/23/2024, false)
client.end;