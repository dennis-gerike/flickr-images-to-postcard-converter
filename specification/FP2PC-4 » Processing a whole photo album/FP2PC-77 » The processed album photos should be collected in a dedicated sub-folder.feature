@FP2PC-4 @ignore
Feature: Processing a whole photo album
  As a user
  I want to be able to convert all photos of a specific Flickr album in one go
  So I don't have to convert each photo individually

  @FP2PC-73
  Rule: The processed album photos are collected in a dedicated sub-folder

  @FP2PC-77
  Scenario: The processed album photos should be collected in a dedicated sub-folder
    When the user selects a photo album
    And the user starts the conversion process
    Then the final images should have been saved to a separate sub-folder