@FP2PC-59 @ignore
Feature: Adding a buffer between photo and caption
  As a user
  I want to be able to control the distance between photo and caption
  So the final image looks better

  @FP2PC-63
  Rule: The reference for calculating the buffer dimensions is the size of the final image without the buffer

  @FP2PC-71
  Scenario: The reference for calculating the buffer dimensions is the size of the final image without the buffer
    Given the user selected a Flickr photo with ratio 1:1
    And the user specified a caption
    When the user specifies a buffer of 20 percent
    And the user starts the conversion process
    Then the buffer should have increased the height of the final image by 20 percent
