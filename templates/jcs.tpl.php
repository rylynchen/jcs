<script src="/<?php echo drupal_get_path('module', 'jcs'); ?>/js/saved_resource(1).js"></script>	
<script src="/<?php echo drupal_get_path('module', 'jcs'); ?>/js/saved_resource(2).js"></script>	
<script>
	$(document).ready(function(){
		try{
    	$("#js_changeImg").changeImg({time:3000,moveVal:196});
			$("#js_changeImg2").changeImg({time:3000,moveVal:160});
      $("#js_cbA").srcollChange({direction:'left'});
    	$("#js_cbB").srcollChange({direction:'left'});
		}catch(e){}
	});
</script>
<div class="js_changeBox" id="js_changeImg">
	<div class="js_imgLst" >
		<?php echo $images_show; ?>
	</div>
	<div class="js_numNav">
		<?php echo $images_min; ?>
	</div>
	<div class="js_title"> 
		<?php echo $first_title; ?>
		<div></div>
	</div>
</div>