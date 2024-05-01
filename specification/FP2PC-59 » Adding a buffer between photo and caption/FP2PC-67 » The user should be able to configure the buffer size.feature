@FP2PC-59
Feature: Adding a buffer between photo and caption
  As a user
  I want to be able to control the distance between photo and caption
  So the final image looks better

  @FP2PC-60
  Rule: The user is able to configure a buffer size

  @FP2PC-67
  Scenario: The user should be able to configure the buffer size
    Given the user selected a photo with an aspect ratio of 1:1
    And the user specified a caption
    When the user specifies a buffer
    And the user starts the conversion process
    Then there should be a buffer between photo and caption in the final image
