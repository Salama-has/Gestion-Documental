<?php
require('fpdf.php');
class PDF extends FPDF
{
	//Cabecera de página
	function Header()
	{
		//Logotipo
		$this->Image("../images/DOCSV-removebg-preview.jpg", 20, 5, 30, 30, "JPG");
		//Arial bold 24
		$this->SetFont('Arial', 'B', 24);
		// Posición: a 1,5 cm del final
		$this->SetX(75);
		$this->Cell(265, 10, utf8_decode('Listado de Autores'), 0, 0, 'C');
		$this->Ln();
		$this->Cell(70);
		$this->SetFillColor(255, 255, 255);
		$this->SetX(55);
		$this->Cell(265, 10, utf8_decode('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'), 0, 0, 'C', True);
		//Salto de línea
		$this->Ln(15);
	}

	// Pie de página
	function Footer()
	{
		// Posición: a 1,5 cm del final
		$this->SetY(-15);
		// Arial italic 8
		$this->SetFont('Arial', 'I', 12);
		// Número de página
		$this->Cell(0, 10, 'GESTION DE Documentos SALAMA HASSANI', 0, 0, 'C');
		$this->SetFont('Arial', 'I', 8);
		$this->Cell(0, 10, '  Pg.: ' . $this->PageNo(), 0, 0, 'C');
	}
}

$w = array(40, 100); // Width of the two columns
$alturafila = 8; //Altura de la fila.

//Creación del objeto de la clase heredada
$pdf = new PDF('L', 'mm', 'A3');
$pdf->SetMargins(10, 15, 20);
$pdf->AddPage();
$pdf->SetFillColor(222, 222, 222);
$pdf->Ln(5);
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetDrawColor(0, 80, 180);
$pdf->SetTextColor(40, 63, 156);
//Ancho del borde (0.3mm)
$pdf->SetLineWidth(0.3);
$pdf->Cell($w[1], $alturafila, utf8_decode('id'), 1, 0, 'C', True);
$pdf->Cell($w[2], $alturafila, utf8_decode('Nombre del autor'), 1, 1, 'C', True);




$pdf->SetFont('Arial', '', 10);
$pdf->SetDrawColor(0, 80, 180);
$pdf->SetFillColor(230, 230, 0);
$pdf->SetTextColor(0, 0, 0);
//Ancho del borde (0.2mm)
$pdf->SetLineWidth(0.2);

function cabecera($pdf)
{
	$pdf->SetMargins(10, 15, 20);
	$pdf->SetFillColor(222, 222, 222);
	$pdf->Ln(5);
	$pdf->SetFont('Arial', 'B', 10);
	$pdf->SetDrawColor(0, 80, 180);
	$pdf->SetTextColor(40, 63, 156);
	// Ancho del borde (0.3mm)
	$pdf->SetLineWidth(0.3);



	$pdf->SetFont('Arial', '', 10);
	$pdf->SetDrawColor(0, 80, 180);
	$pdf->SetFillColor(157, 165, 243);
	$pdf->SetTextColor(0, 0, 0);
	//Ancho del borde (0.2mm)
	$pdf->SetLineWidth(0.2);
}

$host_name = 'localhost';
$database = 's022045b_DocMag';
$user_name = "s022045b_salamaDM";
$password = "2EBEdrY8cY6vtbY"; 

//Conexi贸n a la base da datos.
$connect = mysqli_connect($host_name, $user_name, $password, $database);
//Si existe un error al conectar con la base de datos.
if (mysqli_connect_errno()) {
    echo '<p>"Error: Fallo al conectarse a MySQL debido a: ' .
        mysqli_connect_error() .
        '</p>';
}if ($connect->connect_errno) {
	echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
} else {
	$sql = "select * from authors order by id";
	$resultado = mysqli_query($connect, $sql);

	if (!$resultado) {
		echo "Error";
	} else {
		$pintaFondo = 'True';
		$nlinea = 0;
		$pdf->SetFillColor(157, 165, 243);
		while ($fila = mysqli_fetch_row($resultado)) {
			$pdf->SetFont('Arial', 'B', 10);
			$pdf->Cell($w[1], $alturafila, utf8_decode($fila[0]), 1, 0, 'L', $pintaFondo);
			$pdf->Cell($w[2], $alturafila, utf8_decode($fila[1]), 1, 0, 'L', $pintaFondo);
			$pdf->Ln();
			if ($pintaFondo == 'True') {
				$pintaFondo = '';
			} else {
				$pintaFondo = 'True';
			}
			$nlinea = $nlinea + 1;
			//Añadir página
			if ($nlinea > 26) {
				$nlinea = 0;
				$pdf->AddPage();
				cabecera($pdf);
			}
		}
	}

	mysqli_free_result($resultado);
	$pdf->Ln();
	$filename = "Gestion_Documental.pdf";
	$pdf->Output($filename, "D");
}
?>