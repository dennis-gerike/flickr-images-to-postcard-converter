@FP2PC-27
Feature: Adding a caption
  As a user
  I want to be able to add a caption to the final image
  So I know what is shown there or where the photo was taken or where I can find the original

  @FP2PC-44
  Rule: It should be possible to use pre-defined placeholders in the caption

  @FP2PC-48
  Scenario: It should be possible to use Photo ID and Photo Title as placeholders in the caption
    Given the user selected the Flickr photo "33268827633"
    When the user adds the placeholder "flickr-photo-id" to the caption
    And the user adds the placeholder "flickr-photo-title" to the caption
    And the user starts the conversion process
    Then the processed image should have a caption which contains the text "33268827633"
    And the processed image should have a caption which contains the text "Chevrolet Corvette Sting Ray"
