<?php

	$arr = array(
		array('id'=> 0,'title' => 'Tab0','selected' => true,'chartType'=>'line'),
		array('id'=> 1,'title' => 'Tab1','selected' => false,'chartType'=>'bar'),
		array('id'=> 2,'title' => 'Tab2','selected' => false,'chartType'=>'area'),
		array('id'=> 3,'title' => 'Tab3','selected' => false,'chartType'=>'column'),
		array('id'=> 4,'title' => 'Tab4','selected' => false,'chartType'=>'scatter')
	);

	echo json_encode($arr);
?>