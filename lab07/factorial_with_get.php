<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<meta name="description" content=""/>
	<meta name="keywords" content="HTML, something, else"/>
	<meta name="author" content="Matthew Hulme"/>
	<title>Lab 07</title>
</head>
<body>
	<?php
		include ("mathfunctions.php");
	?>
<h1>Creating Web Applications - Lab 07</h1>
<?php
	if(isset($_GET["number"])) {
		$num = $_GET["number"];
		if (isPositiveInteger($num)) {
			echo "<p>", $num, "! is ", factorial ($num), ".</>";
		} else {
			echo "<p>Please enter a positive integer.</p>";
		}
		echo "<p><a href='index.html'>Return to the Entry Page</a></p>";
	}
?>
</body>
</html>
