@FP2PC-59 @ignore
Feature: Adding a buffer between photo and caption
  As a user
  I want to be able to control the distance between photo and caption
  So the final image looks better

  @FP2PC-62
  Rule: The default buffer size is 0

  @FP2PC-69
  Scenario: The default buffer size is 0
    Given the user selected a Flickr photo with ratio 1:1
    And the user specified a caption
    When the user specifies no buffer
    And the user starts the conversion process
    Then there should be no buffer between photo and caption in the final image
