@FP2PC-64 @ignore
Feature: Support for empty caption
  As a user
  I want to have the option to create an empty caption box
  So I can manually add information about the picture

  @FP2PC-65
  Rule: It should not be possible to have a regular caption and an empty caption at the same time

  @FP2PC-66
  Scenario: It should not be possible to have a regular caption and an empty caption at the same time
    Given the user selected a Flickr photo
    When the user specifies an empty caption
    And the user starts the conversion process
    Then the final image should contain a caption segment
    But the caption segment in the final image should contain no text
