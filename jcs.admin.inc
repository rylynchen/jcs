<?php

/**
 * Form builder; Configure jcs settings.
 */
function jcs_settings_form() {
  $form = array();
  $styles = array();
  foreach (image_styles() as $key => $style) {
    $styles[$key] = $style['name'];
  }
  $form['jcs_style_min'] = array(
    '#type'           => 'select',
    '#title'          => t('底部min图片样式'),
    '#options'        => $styles,
    '#default_value'  => variable_get('jcs_style_min', ''),
    '#required'       => TRUE,
  );
  $form['jcs_style_show'] = array(
    '#type'           => 'select',
    '#title'          => t('展示图片样式'),
    '#options'        => $styles,
    '#default_value'	=> variable_get('jcs_style_show', ''),
    '#required'       => TRUE,
  );
  return system_settings_form($form);
}