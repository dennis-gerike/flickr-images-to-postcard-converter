@FP2PC-28 @ignore
Feature: Processing a Flickr photo
  As a user
  I want to be able to convert one specific Flickr photo
  So I can quickly fill a gap in my collection

  @FP2PC-30
  Rule: The application should convert a photo when given a valid Flickr ID

  @FP2PC-32
  Scenario: The application should convert a photo when given a valid Flickr ID
    When the user selects a Flickr photo
    And the user starts the conversion process
    Then the final image should have been created
