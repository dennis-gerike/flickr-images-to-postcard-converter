@FP2PC-4
Feature: Processing a whole photo album
  As a user
  I want to be able to convert all photos of a specific Flickr album in one go
  So I don't have to convert each photo individually

  @FP2PC-54
  Rule: The user can select a photo or a photo album, but not both

  @FP2PC-76
  Scenario: The user should not be able to select a photo and a photo album at the same time
    When the user selects a photo A
    And the user selects a photo album B
    And the user starts the conversion process
    Then the photo album B should have been processed
    But the photo A should not have been processed