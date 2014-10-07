<!doctype html>
<html>
<head>
	<title>k&B :: File Uploader</title>

	<link rel="stylesheet" href="css/global.css" />

</head>
<body>

	<div>
		<img src="images/kalah-and-brent-blue.png" alt="" />
		<fieldset>
			<form enctype="multipart/form-data" action="upload.php" method="POST">
				<input type="hidden" name="MAX_FILE_SIZE" value="5120000" />
				Send this file: <input name="userfile" type="file" />
				<input type="submit" value="Send File" />
			</form>
		</fieldset>
	</div>


</body>
</html>