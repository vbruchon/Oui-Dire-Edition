<?php

function createAudioPlayerForExtractByProduct()
{
  $output = '';
  if (is_product()) {
    $product_id = get_the_ID();
    $extracts_with_values = array();

    for ($i = 1; $i <= 10; $i++) {
      $extract_key = 'extract_' . $i;
      $field = get_field($extract_key, $product_id);

      if ($field) {
        $sub_field_title_value = $field['title'];
        $sub_field_link_value = $field['link'];

        if (!empty($sub_field_title_value) && !empty($sub_field_link_value)) {
          $extracts_with_values[] = array(
            'title' => $sub_field_title_value,
            'link' => $sub_field_link_value
          );
        }
      }
    }
    echo '<head>';
    echo '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/audioPlayer/assets/css/index.css">';
    echo '</head>';


    $output .= '<div id="playlist">';
    foreach ($extracts_with_values as $extract) {
      $output .= '<div class="audio-player">';
      $output .= '<audio class="audioPlayer" src="' . $extract['link'] . '"></audio>';
      $output .= '<div class="audio-player-element">';
      $output .= '<div class="button-section">';
      $output .= '<img class="play-button" src="' . get_stylesheet_directory_uri() . '/audioPlayer/assets/icone/play-button.png" width="16px">';
      $output .= '<img class="pause-button" src="' . get_stylesheet_directory_uri() . '/audioPlayer/assets/icone/pause-button.png" width="20px">';
      $output .= '</div>';

      $output .= '<p class="title">' . $extract['title'] . '</p>';
      $output .= '<div class="player">';
      $output .= '<input type="range" class="track" min="0" value="0">';
      $output .= '<span class="elapsed">0:00</span> / <span class="track-time">1:00</span>';
      $output .= '</div>';
      $output .= '</div>';
      $output .= '</div>';
    }
    $output .= '</div>';

    $output .= '<script src="' . get_stylesheet_directory_uri() . '/audioPlayer/assets/js/index.js"></script>';
  }

  return $output;
}

add_shortcode('audioPlayer', 'createAudioPlayerForExtractByProduct');
